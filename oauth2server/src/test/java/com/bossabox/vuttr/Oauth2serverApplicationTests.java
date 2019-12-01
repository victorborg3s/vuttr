package com.bossabox.vuttr;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.bossabox.vuttr.oauth2server.Oauth2ServerApplication;
import com.bossabox.vuttr.oauth2server.config.OAuth2AuthorizationServerConfig;
import com.bossabox.vuttr.oauth2server.config.ServerWebSecurityConfig;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { Oauth2ServerApplication.class, OAuth2AuthorizationServerConfig.class,
		ServerWebSecurityConfig.class })
@ActiveProfiles("dev")
class Oauth2serverApplicationTests {

	@Test
	void contextLoads() {
	}

}
