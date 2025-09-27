package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LocationRequest {
    
    @NotNull(message = "Latitude is required")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    private Double longitude;
    
    private Double radius = 10.0; // Default radius in kilometers
    
    private String category; // tourist_attractions, restaurants, hotels, hospitals, etc.
    
    private String language = "en"; // en, hi
}

