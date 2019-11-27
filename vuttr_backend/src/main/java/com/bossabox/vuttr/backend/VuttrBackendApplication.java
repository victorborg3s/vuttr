package com.bossabox.vuttr.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({ "com.bossabox.vuttr.backend.config", "com.bossabox.vuttr.backend.controller",
		"com.bossabox.vuttr.backend.model", "com.bossabox.vuttr.backend.persistence" })
@EnableJpaRepositories(basePackages = "com.bossabox.vuttr.backend.persistence")
public class VuttrBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VuttrBackendApplication.class, args);
	}

}
