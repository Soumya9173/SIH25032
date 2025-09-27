package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransportResponse {
    private List<TransportOption> options;
    private String status;
    private String message;
    private String source;
    private String destination;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TransportOption {
        private String transportType;
        private String operator;
        private String vehicleNumber;
        private String departureTime;
        private String arrivalTime;
        private String duration;
        private Double price;
        private Integer availableSeats;
        private String status; // available, limited, full
        private String amenities;
        private String route;
    }
}

