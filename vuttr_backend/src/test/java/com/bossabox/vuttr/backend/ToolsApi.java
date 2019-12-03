package com.bossabox.vuttr.backend;

import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;

import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;

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
@AutoConfigureRestDocs(outputDir = "target/generated-snippets", uriPort = 3000)
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

		this.mockMvc.perform(get("/tools").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().json(jsonSubjects))
				.andDo(document("{class-name}/{method-name}",
						responseFields(fieldWithPath("[]").type(JsonFieldType.ARRAY).description("An array of tools"))
								.andWithPrefix("[].", toolDescriptor)));
	}

	@Test
	public void WhenGetToolsWithParameterShouldReturnToolListWithTag() throws Exception {
		String tag = "node";
		List<Tool> filteredList = toolsSubjects.stream().filter(tool -> tool.getTags().contains(tag))
				.collect(Collectors.toList());
		when(toolDaoMock.findByTag(tag)).thenReturn(filteredList);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubjects = mapper.writeValueAsString(filteredList);

		this.mockMvc.perform(get(String.format("/tools?tag=%s", tag)).accept(MediaType.APPLICATION_JSON)).andDo(print())
				.andExpect(status().isOk()).andExpect(content().json(jsonSubjects))
				.andDo(document("{class-name}/{method-name}",
						responseFields(fieldWithPath("[]").type(JsonFieldType.ARRAY).description("An array of tools"))
								.andWithPrefix("[].", toolDescriptor)));
	}

	@Test
	public void WhenCreateOrUpdateToolWhithoutCredentialShouldReturnUnauthorized() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.save(toolSubject)).thenReturn(toolSubject);
		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").content(jsonSubject).contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8"))
				.andExpect(status().isUnauthorized()).andExpect(content().json("{'error': 'unauthorized'}"))
				.andDo(document("{class-name}/{method-name}"));
	}

	@Test
	public void WhenCreateOrUpdateToolWithValidCredentialShouldReturnTool() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.save(any(Tool.class))).thenReturn(toolSubject);
		when(tokenServiceMock.loadAuthentication(any(String.class))).thenReturn(auth);

		ObjectMapper mapper = new ObjectMapper();
		String jsonSubject = mapper.writeValueAsString(toolSubject);

		this.mockMvc
				.perform(post("/tools").header("Authorization", "Bearer a-valid-oauth2-authentication-token")
						.content(jsonSubject).contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8"))
				.andExpect(status().isCreated()).andExpect(content().json(jsonSubject)).andDo(document(
						"{class-name}/{method-name}", requestFields(toolDescriptor), responseFields(toolDescriptor)));
	}

	@Test
	public void WhenDeleteToolWhithoutCredentialShouldReturnUnauthorized() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.getOne(toolSubject.getId())).thenReturn(toolSubject);

		this.mockMvc.perform(delete(String.format("/tools/%d", toolSubject.getId())))
				.andExpect(status().isUnauthorized()).andExpect(content().json("{'error': 'unauthorized'}"))
				.andDo(document("{class-name}/{method-name}"));
	}

	@Test
	public void WhenDeleteToolWithValidCredentialShouldReturnNotContent() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.getOne(toolSubject.getId())).thenReturn(toolSubject);
		when(tokenServiceMock.loadAuthentication(any(String.class))).thenReturn(auth);

		this.mockMvc
				.perform(delete("/tools/{id}", toolSubject.getId()).header("Authorization",
						"Bearer a-valid-oauth2-authentication-token"))
				.andExpect(status().isNoContent()).andDo(document("{class-name}/{method-name}",
						pathParameters(parameterWithName("id").description("Tools' id to remove."))));
	}

	@Test
	public void WhenDeleteToolWithValidCredentialAndNoParameterShouldReturnMethodNotAllowed() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.getOne(toolSubject.getId())).thenReturn(toolSubject);
		when(tokenServiceMock.loadAuthentication(any(String.class))).thenReturn(auth);

		this.mockMvc.perform(delete("/tools").header("Authorization", "Bearer a-valid-oauth2-authentication-token"))
				.andExpect(status().isMethodNotAllowed());
	}

	@Test
	public void WhenDeleteToolWithValidCredentialAndInvalidParameterShouldReturnMethodNotAllowed() throws Exception {
		Tool toolSubject = toolsSubjects.get(0);
		when(toolDaoMock.getOne(toolSubject.getId())).thenReturn(toolSubject);
		when(tokenServiceMock.loadAuthentication(any(String.class))).thenReturn(auth);

		this.mockMvc
				.perform(delete("/tools/{id}", "-1").header("Authorization",
						"Bearer a-valid-oauth2-authentication-token"))
				.andExpect(status().isBadRequest())
				.andExpect(content().json("{'error': 'Absent or invalid request parameter.'}"))
				.andDo(document("{class-name}/{method-name}"));
	}

}
