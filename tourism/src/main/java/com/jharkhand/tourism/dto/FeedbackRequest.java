package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeedbackRequest {
    
    @NotBlank(message = "Feedback text is required")
    private String feedbackText;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
    
    private String category; // accommodation, tour, event, product, general
    
    private Long entityId; // ID of the related entity (product, event, etc.)
    
    private String entityType; // Product, Event, Homestay, EcoTour
}

