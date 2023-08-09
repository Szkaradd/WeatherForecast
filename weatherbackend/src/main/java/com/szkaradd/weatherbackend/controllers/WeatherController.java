package com.szkaradd.weatherbackend.controllers;

import com.szkaradd.weatherbackend.models.WeatherResponse;
import com.szkaradd.weatherbackend.services.OpenAIService;
import com.szkaradd.weatherbackend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private OpenAIService openAIService;

    @GetMapping("/weather")
    public ResponseEntity<WeatherResponse> getWeather(@RequestParam String city) {
        WeatherResponse response = weatherService.getWeatherForCity(city);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        String prompt = "Imagine you are weather girl in tv. Describe weather from this data: " +
                response + " fit in 220 characters, please.";
        String gptDesc = openAIService.generateWeatherText(prompt);
        response.setOpenAIDescription(gptDesc);
        return ResponseEntity.ok(response);
    }

}
