package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.ItineraryRequest;
import com.jharkhand.tourism.dto.ItineraryResponse;
import com.jharkhand.tourism.service.ItineraryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {
    
    @Autowired
    private ItineraryService itineraryService;
    
    @PostMapping("/plan")
    public ResponseEntity<ItineraryResponse> planItinerary(@Valid @RequestBody ItineraryRequest request) {
        try {
            ItineraryResponse response = itineraryService.generateItinerary(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

