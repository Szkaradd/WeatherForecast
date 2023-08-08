package com.szkaradd.weatherbackend.services;

import com.szkaradd.weatherbackend.models.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherResponse getWeatherForCity(String city) {
        String url = BASE_URL + city + "&appid=" + apiKey + "&units=metric";
        return restTemplate.getForObject(url, WeatherResponse.class);
    }
}
