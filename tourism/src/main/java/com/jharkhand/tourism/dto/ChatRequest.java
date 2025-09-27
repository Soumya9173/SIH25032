package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatRequest {
    
    @NotBlank(message = "Message is required")
    private String message;
    
    private String language = "en"; // en, hi, tribal (placeholder)
    
    private String context; // tourism, accommodation, transport, etc.
}

