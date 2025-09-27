package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class ItineraryRequest {
    
    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be positive")
    private Double budget;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer durationDays;
    
    private List<String> interests; // adventure, culture, nature, wildlife, religious
    
    private String preferredLocation; // Ranchi, Jamshedpur, Dhanbad, etc.
    
    private String accommodationType; // budget, mid-range, luxury
    
    private String transportPreference; // public, private, mixed
}

