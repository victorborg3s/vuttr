package com.bossabox.vuttr.backend;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.bossabox.vuttr.backend.model.Tool;
import com.bossabox.vuttr.backend.persistence.ToolDao;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@ExtendWith({ RestDocumentationExtension.class, SpringExtension.class })
@WebAppConfiguration
class ToolsApi {

	@Autowired
	private WebApplicationContext context;

	@MockBean
	private ToolDao toolDaoMock;
	
    private MockMvc mockMvc;
	private Tool toolSubject;
	private List<Tool> toolsSubjects;

	@BeforeEach
	public void setUp(RestDocumentationContextProvider restDocumentation) {
		this.toolSubject = new Tool();
		toolSubject.setId(1);
		toolSubject.setTitle("Notion");
		toolSubject.setLink("https://notion.so");
		toolSubject.setDescription(
				"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ");
		List<String> tags = new ArrayList<String>();
		tags.add("organization");
		tags.add("planning");
		tags.add("collaboration");
		tags.add("writing");
		tags.add("calendar");
		toolSubject.setTags(tags);

		toolsSubjects = new ArrayList<Tool>();
		toolsSubjects.add(toolSubject);

		this.mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(documentationConfiguration(restDocumentation))
				.apply(springSecurity()).build();
	}

	FieldDescriptor[] toolDescriptor = new FieldDescriptor[] {
			fieldWithPath("id").type(JsonFieldType.NUMBER).description("Unique number that itentifies the tool"),
			fieldWithPath("title").type(JsonFieldType.STRING).description("Tool's title"),
			fieldWithPath("link").type(JsonFieldType.STRING).description("Website where to find tool's reference"),
			fieldWithPath("description").type(JsonFieldType.STRING).description("Tool's description"),
			fieldWithPath("tags[]").type(JsonFieldType.ARRAY).description("Tags that categorize the tool") };

	@Test
	public void WhenGetToolsWithoutParameterShouldReturnToolList() throws Exception {
		when(toolDaoMock.findAll()).thenReturn(toolsSubjects);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubjects = mapper.writeValueAsString(toolsSubjects);

		this.mockMvc.perform(get("/tools").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk())
				.andExpect(content().json(jsonSubjects))
				.andDo(document("{class-name}/{method-name}",
						responseFields(fieldWithPath("[]").type(JsonFieldType.ARRAY).description("An array of tools"))
								.andWithPrefix("[].", toolDescriptor)));
	}

	@Test
	public void WhenCreateOrUpdateToolWhithoutCredentialsShouldDenyAccess() throws Exception {
		when(toolDaoMock.save(toolSubject)).thenReturn(toolSubject);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").content(jsonSubject).contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().isForbidden())
				.andExpect(content().json("{'error': 'Access denied.'}")).andDo(document("{class-name}/{method-name}"));
	}

	@Test
	@WithMockUser(username ="admin", authorities = {"ADMIN"}, roles = {"USER"})
	public void WhenCreateOrUpdateToolWhithCredentialsShouldDenyAccess() throws Exception {
		when(toolDaoMock.save(toolSubject)).thenReturn(toolSubject);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").content(jsonSubject).contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().isForbidden())
				.andExpect(content().json("{'error': 'Access denied.'}")).andDo(document("{class-name}/{method-name}"));
	}

}
