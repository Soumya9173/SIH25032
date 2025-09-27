package com.jharkhand.tourism.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BlockchainTransactionRequest {
    
    @NotNull(message = "Transaction type is required")
    private String transactionType; // booking, payment, verification
    
    @NotNull(message = "Amount is required")
    private BigDecimal amount;
    
    private String description;
    
    private String entityId; // ID of the related entity
    
    private String entityType; // Product, Event, Homestay, EcoTour
    
    private String guideId; // For guide verification
    
    private String guideLicense; // For guide verification
}

