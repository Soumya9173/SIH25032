package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GuideVerificationRequest {
    
    @NotBlank(message = "Guide ID is required")
    private String guideId;
    
    @NotBlank(message = "Guide license is required")
    private String guideLicense;
    
    private String guideName;
    
    private String contactNumber;
    
    private String specialization; // wildlife, cultural, adventure, etc.
}

