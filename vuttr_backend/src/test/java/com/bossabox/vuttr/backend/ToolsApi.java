package com.bossabox.vuttr.backend;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@ExtendWith({ RestDocumentationExtension.class, SpringExtension.class })
//@AutoConfigureMockMvc
class ToolsApi {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@BeforeEach
	public void setUp(RestDocumentationContextProvider restDocumentation) {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(documentationConfiguration(restDocumentation))
				.build();
	}

	FieldDescriptor[] tool = new FieldDescriptor[] {
			fieldWithPath("id").type(JsonFieldType.NUMBER).description("Unique number that itentifies the tool"),
			fieldWithPath("title").type(JsonFieldType.STRING).description("Tool's title"),
			fieldWithPath("link").type(JsonFieldType.STRING).description("Website where to find tool's reference"),
			fieldWithPath("description").type(JsonFieldType.STRING).description("Tool's description"),
			fieldWithPath("tags[]").type(JsonFieldType.ARRAY).description("Tags that categorize the tool") };

	@Test
	public void getToolsWithNoParameter() throws Exception {
		this.mockMvc.perform(get("/tools").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk())
				.andExpect(content().json(
						"[{\"id\":1,\"title\":\"fastify\",\"link\":\"https://www.fastify.io/\",\"description\":\"Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.\",\"tags\":[\"web\",\"framework\",\"node\",\"http2\",\"https\",\"localhost\"]},{\"id\":2,\"title\":\"json-server\",\"link\":\"https://github.com/typicode/json-server\",\"description\":\"Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.\",\"tags\":[\"api\",\"json\",\"schema\",\"node\",\"github\",\"rest\"]},{\"id\":4,\"title\":\"Notion\",\"link\":\"https://notion.so\",\"description\":\"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. \",\"tags\":[\"organization\",\"planning\",\"collaboration\",\"writing\",\"calendar\"]}]"))
				.andDo(document("{class-name}/{method-name}",
						responseFields(fieldWithPath("[]").type(JsonFieldType.ARRAY).description("An array of tools"))
								.andWithPrefix("[].", tool)));
	}

//	@Test
//	public void getTools_WithTagNode_ListTwoRecords() throws Exception {
//		this.mockMvc
//				.perform(get("/tools").content("{\"myString\": \"value\"}").characterEncoding("UTF-8")
//						.accept(MediaType.APPLICATION_JSON))
//				.andDo(print()).andExpect(status().isOk()).andExpect(content().json("{\"hello\":\"World\"}"))
//				.andDo(document("index",
//						requestFields(fieldWithPath("myString").type(JsonFieldType.STRING)
//								.description("A sample request field")),
//						responseFields(fieldWithPath("hello").description("The \"Hello, Word\" message"))));
//	}

}
