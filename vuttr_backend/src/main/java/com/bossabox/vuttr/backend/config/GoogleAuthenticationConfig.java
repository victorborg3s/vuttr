package com.bossabox.vuttr.backend.config;

import java.util.Collections;

import org.springframework.context.annotation.Configuration;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

@Configuration
public class GoogleAuthenticationConfig {
/* TODO: implement some verifier to check the user token that came from frontend
	GoogleIdTokenVerifier verifier() {
		return new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
			    // Specify the CLIENT_ID of the app that accesses the backend:
			    .setAudience(Collections.singletonList("136871268423-7460fnuho6lug9jib7u43fa3rej9ovcd"))
			    // Or, if multiple clients access the backend:
			    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
			    .build();
	}
*/
}
