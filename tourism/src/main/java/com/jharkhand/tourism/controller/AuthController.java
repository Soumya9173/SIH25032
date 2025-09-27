package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.AuthRequest;
import com.jharkhand.tourism.dto.AuthResponse;
import com.jharkhand.tourism.dto.RegisterRequest;
import com.jharkhand.tourism.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> body = new HashMap<>();
            body.put("message", e.getMessage());
            body.put("status", 400);
            return ResponseEntity.badRequest().body(body);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> body = new HashMap<>();
            body.put("message", e.getMessage());
            body.put("status", 400);
            return ResponseEntity.badRequest().body(body);
        }
    }
}

