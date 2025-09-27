package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationResponse {
    private List<NearbyPlace> nearbyPlaces;
    private String status;
    private String message;
    private Double userLatitude;
    private Double userLongitude;
    private Double searchRadius;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NearbyPlace {
        private String name;
        private String address;
        private Double latitude;
        private Double longitude;
        private String category;
        private Double distance; // in kilometers
        private String description;
        private String phoneNumber;
        private Double rating;
        private String imageUrl;
        private String openingHours;
    }
}

