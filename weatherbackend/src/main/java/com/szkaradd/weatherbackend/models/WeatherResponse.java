package com.szkaradd.weatherbackend.models;

import lombok.Data;

@Data
public class WeatherResponse {
    private Main main;
    private String name;
    private Wind wind;
    private Clouds clouds;
    private Weather[] weather;
    private String openAIDescription;

    @Data
    public static class Main {
        private double temp;
        private double feels_like;
        private double temp_min;
        private double temp_max;
        private int pressure;
        private int humidity;
    }

    @Data
    public static class Wind {
        private double speed;
        private int deg;
    }

    @Data
    public static class Clouds {
        private int all;
    }

    @Data
    public static class Weather {
        private int id;
        private String main;
        private String description;
        private String icon;
    }

}
