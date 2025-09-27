package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TransportRequest {
    
    @NotBlank(message = "Source location is required")
    private String source;
    
    @NotBlank(message = "Destination location is required")
    private String destination;
    
    private String transportType; // bus, train, taxi, flight
    
    private String date; // YYYY-MM-DD format
    
    private String time; // HH:MM format
    
    private Integer passengers = 1;
}

