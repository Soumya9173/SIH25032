package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.AnalyticsResponse;
import com.jharkhand.tourism.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private AnalyticsService analyticsService;
    
    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnalyticsResponse> getAnalyticsDashboard() {
        try {
            AnalyticsResponse response = analyticsService.getAnalyticsDashboard();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

