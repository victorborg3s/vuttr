package com.bossabox.vuttr.backend;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.bossabox.vuttr.backend.controller.ToolController;
import com.bossabox.vuttr.backend.model.Tool;
import com.bossabox.vuttr.backend.persistence.ToolDao;

@RunWith(SpringRunner.class)
@Import(TestConfig.class)
@WebMvcTest(ToolController.class)
@ActiveProfiles("test")
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
class ToolsApi {

	@MockBean
	private ToolDao toolDaoMock;

	@MockBean
	private ResourceServerTokenServices tokenServiceMock;
	
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private OAuth2Authentication auth;
	
	@Autowired
	private Tool toolSubject;
	
	@Autowired
	private List<Tool> toolsSubjects;
	
	private FieldDescriptor[] toolDescriptor = new FieldDescriptor[] {
			fieldWithPath("id").type(JsonFieldType.NUMBER).description("Unique number that itentifies the tool"),
			fieldWithPath("title").type(JsonFieldType.STRING).description("Tool's title"),
			fieldWithPath("link").type(JsonFieldType.STRING).description("Website where to find tool's reference"),
			fieldWithPath("description").type(JsonFieldType.STRING).description("Tool's description"),
			fieldWithPath("tags[]").type(JsonFieldType.ARRAY).description("Tags that categorize the tool") };

	@BeforeEach
	public void setUp() {
	}

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
	public void WhenCreateOrUpdateToolWhithoutCredentialsShouldUnauthorize() throws Exception {
		when(toolDaoMock.save(toolSubject)).thenReturn(toolSubject);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").content(jsonSubject).contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().isUnauthorized())
				.andExpect(content().json("{'error': 'unauthorized'}")).andDo(document("{class-name}/{method-name}"));
	}

	@Test
	public void WhenCreateOrUpdateToolWhithValidCredentialsShouldReturnTool() throws Exception {
		when(toolDaoMock.save(any(Tool.class))).thenReturn(toolSubject);
		when(tokenServiceMock.loadAuthentication(any(String.class))).thenReturn(auth);
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").header("Authorization", "Bearer a-valid-oauth2-authentication-token").content(jsonSubject)
						.contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().isCreated())
				.andExpect(content().json(jsonSubject))
				.andDo(document("{class-name}/{method-name}",
						requestFields(toolDescriptor),
						responseFields(toolDescriptor)));
	}

}
