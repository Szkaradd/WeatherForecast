package com.szkaradd.weatherbackend.services;

import com.szkaradd.weatherbackend.models.OpenAIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String BASE_URL;

    @Value("${openai.model}")
    private String MODEL;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateWeatherText(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String requestBody = "{ \"model\": \"" + MODEL +
                "\", \"messages\": [{\"role\": \"user\", \"content\": \"" +
                prompt + "\"}], \"temperature\": 1, \"max_tokens\": 220, " +
                "\"stop\": [\"\\n\"] }";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        OpenAIResponse response = restTemplate.exchange(
                BASE_URL,
                HttpMethod.POST,
                request,
                OpenAIResponse.class).getBody();

        if (response == null || response.getChoices() == null || response.getChoices().length == 0) {
            return "No response from OpenAI";
        }

        return response.getChoices()[0].getMessage().getContent();
    }
}
