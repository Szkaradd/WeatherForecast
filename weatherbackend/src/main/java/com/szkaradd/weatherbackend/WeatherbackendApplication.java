package com.szkaradd.weatherbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = {"classpath:application.properties", "classpath:application-secrets.properties"}, ignoreResourceNotFound = true)
public class WeatherbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeatherbackendApplication.class, args);
	}

}
