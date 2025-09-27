package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.LocationRequest;
import com.jharkhand.tourism.dto.LocationResponse;
import com.jharkhand.tourism.service.LocationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    
    @Autowired
    private LocationService locationService;
    
    @PostMapping("/nearby")
    public ResponseEntity<LocationResponse> findNearbyPlaces(@Valid @RequestBody LocationRequest request) {
        try {
            LocationResponse response = locationService.findNearbyPlaces(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

