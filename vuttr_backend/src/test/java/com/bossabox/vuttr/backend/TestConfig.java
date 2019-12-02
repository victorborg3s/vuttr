package com.bossabox.vuttr.backend;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;

import com.bossabox.vuttr.backend.model.Tool;

@TestConfiguration
public class TestConfig {
 
	private OAuth2Authentication authentication = null;
	private Tool tool = null;
	private List<Tool> tools = null;
	
    @Bean
    @Primary
    OAuth2Authentication authentication() {
    	if (authentication == null) {
        	String clientId = "oauth-client-id";
    	    Map<String, String> requestParameters = Collections.emptyMap();
    	    boolean approved = true;
    	    String redirectUrl = "http://my-redirect-url.com";
    	    Set<String> responseTypes = Collections.emptySet();
    	    Set<String> scopes = new HashSet<String>();
    	    scopes.add("read");
    	    Set<String> resourceIds = Collections.emptySet();
    	    Map<String, Serializable> extensionProperties = Collections.emptyMap();
    	    List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("Everything");

    	    OAuth2Request oAuth2Request = new OAuth2Request(requestParameters, clientId, authorities,
    	        approved, scopes, resourceIds, redirectUrl, responseTypes, extensionProperties);
    	    
    	    User userPrincipal = new User("user", "", true, true, true, true, authorities);

    	    HashMap<String, String> details = new HashMap<String, String>();
    	    details.put("user_name", "bwatkins");
    	    details.put("email", "bwatkins@test.org");
    	    details.put("name", "Brian Watkins");

    	    TestingAuthenticationToken token = new TestingAuthenticationToken(userPrincipal, null, authorities);
    	    token.setAuthenticated(true);
    	    token.setDetails(details);
    	    authentication = new OAuth2Authentication(oAuth2Request, token);
    	}
		
		return authentication;
    }
    
    @Bean
    @Primary
    Tool toolTestSubject() {
    	if (tool == null) {
    		tool = new Tool();
    		tool.setId(1);
    		tool.setTitle("Notion");
    		tool.setLink("https://notion.so");
    		tool.setDescription(
    				"All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.");
    		List<String> tags = new ArrayList<String>();
    		tags.add("organization");
    		tags.add("planning");
    		tags.add("collaboration");
    		tags.add("writing");
    		tags.add("calendar");
    		tool.setTags(tags);
    	}
		return tool;
    }
    
    @Bean
    @Primary
    List<Tool> toolsTestSubject() {
    	if (tools == null) {
    		tools = new ArrayList<Tool>();
    		tools.add(toolTestSubject());

    		Tool tool = new Tool();
    		List<String> tags = new ArrayList<String>();
    		tool.setId(1);
    		tool.setTitle("json-server");
    		tool.setLink("https://github.com/typicode/json-server");
    		tool.setDescription(
    				"Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.");
    		tags.add("api");
    		tags.add("json");
    		tags.add("schema");
    		tags.add("node");
    		tags.add("github");
    		tags.add("rest");
    		tool.setTags(tags);
    		tools.add(tool);

    		tool = new Tool();
    		tags = new ArrayList<String>();
    		tool.setId(1);
    		tool.setTitle("fastify");
    		tool.setLink("https://www.fastify.io/");
    		tool.setDescription(
    				"Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.");
    		tags.add("web");
    		tags.add("framework");
    		tags.add("node");
    		tags.add("http2");
    		tags.add("https");
    		tags.add("localhost");
    		tool.setTags(tags);
    		tools.add(tool);
    	}
    	return tools;
    }

}