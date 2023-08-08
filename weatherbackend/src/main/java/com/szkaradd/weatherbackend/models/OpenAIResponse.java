package com.szkaradd.weatherbackend.models;

import lombok.Data;

@Data
public class OpenAIResponse {
    private Choice[] choices;

    @Data
    public static class Choice {
        private Message message;
    }

    @Data
    public static class Message {
        private String role;
        private String content;
    }
}
