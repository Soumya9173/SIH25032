package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.TransportRequest;
import com.jharkhand.tourism.dto.TransportResponse;
import com.jharkhand.tourism.service.TransportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transport")
public class TransportController {
    
    @Autowired
    private TransportService transportService;
    
    @PostMapping("/realtime")
    public ResponseEntity<TransportResponse> getRealtimeTransportInfo(@Valid @RequestBody TransportRequest request) {
        try {
            TransportResponse response = transportService.getRealtimeTransportInfo(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

