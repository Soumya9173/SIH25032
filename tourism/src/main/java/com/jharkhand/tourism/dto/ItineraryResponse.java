package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryResponse {
    private Long itineraryId;
    private String generatedPlan;
    private Double estimatedCost;
    private Integer durationDays;
    private List<String> recommendedPlaces;
    private List<String> recommendedActivities;
    private String accommodationSuggestions;
    private String transportSuggestions;
    private String tips;
}

