package com.bossabox.vuttr.backend;

import java.io.Serializable;
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

@TestConfiguration
public class TestConfig {
 
    @Bean
    @Primary
    OAuth2Authentication authentication(){
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
		
		return new OAuth2Authentication(oAuth2Request, token);
    }
}