package com.bossabox.vuttr.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class VuttrBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VuttrBackendApplication.class, args);
	}

	@RestController
	private static class SampleController {

		@PostMapping("/")
		public SampleHello index(String param) {
			return new SampleHello();
		}

		private static class SampleHello {
			String hello = "World";

			public String getHello() {
				return hello;
			}

			public void setHello(String value) {
				this.hello = value;
			}
			
		}
		
	}
	
}
