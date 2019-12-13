package com.bossabox.vuttr.oauth2server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({ "com.bossabox.vuttr.oauth2server.model", "com.bossabox.vuttr.oauth2server.persistence",
		"com.bossabox.vuttr.oauth2server.config", "com.bossabox.vuttr.oauth2server.service" })
@EnableJpaRepositories(basePackages = "com.bossabox.vuttr.oauth2server.persistence")
public class Oauth2ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(Oauth2ServerApplication.class, args);
	}

}
