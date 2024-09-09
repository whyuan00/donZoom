package com.example.donzoom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SpecialApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpecialApplication.class, args);
	}

}
