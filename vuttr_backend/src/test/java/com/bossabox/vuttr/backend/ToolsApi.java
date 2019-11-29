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
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;

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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.bossabox.vuttr.backend.controller.ToolController;
import com.bossabox.vuttr.backend.model.Tool;

@SpringBootTest
@ExtendWith({ RestDocumentationExtension.class, SpringExtension.class })
//@AutoConfigureMockMvc
class ToolsApi {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@MockBean
	private ToolController toolControllerMock;

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
				.build();
	}

	FieldDescriptor[] toolDescriptor = new FieldDescriptor[] {
			fieldWithPath("id").type(JsonFieldType.NUMBER).description("Unique number that itentifies the tool"),
			fieldWithPath("title").type(JsonFieldType.STRING).description("Tool's title"),
			fieldWithPath("link").type(JsonFieldType.STRING).description("Website where to find tool's reference"),
			fieldWithPath("description").type(JsonFieldType.STRING).description("Tool's description"),
			fieldWithPath("tags[]").type(JsonFieldType.ARRAY).description("Tags that categorize the tool") };

	@Test
	public void getToolsWithNoParameter() throws Exception {
		when(toolControllerMock.getAll(null)).thenReturn(toolsSubjects);

		this.mockMvc.perform(get("/tools").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk())
				.andExpect(content().json("[{id: 1,title: \"Notion\",link: \"https://notion.so\","
						+ "        description: \"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. \",\n"
						+ "        tags: [\"organization\",\"planning\",\"collaboration\",\"writing\",\"calendar\"]"
						+ "}]"))
				.andDo(document("{class-name}/{method-name}",
						responseFields(fieldWithPath("[]").type(JsonFieldType.ARRAY).description("An array of tools"))
								.andWithPrefix("[].", toolDescriptor)));
	}

	@Test
	public void createOrUpdateTool() throws Exception {
		when(toolControllerMock.save(toolSubject)).thenReturn(toolSubject);

		this.mockMvc.perform(post("/tools").content("{\"id\": 1,\"title\": \"Notion\",\"link\": \"https://notion.so\","
				+ "\"description\": \"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. \",\n"
				+ "\"tags\": [\"organization\",\"planning\",\"collaboration\",\"writing\",\"calendar\"]}")
				.contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8"))
				.andDo(print()).andExpect(status().isCreated())
				.andExpect(content().json("{\"id\": 1,\"title\": \"Notion\",\"link\": \"https://notion.so\",\"description\": \"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. \", \"tags\": [\"organization\",\"planning\",\"collaboration\",\"writing\",\"calendar\"]}"))
				.andDo(document("{class-name}/{method-name}",
						requestFields(toolDescriptor),
						responseFields(toolDescriptor)));
	}

}
