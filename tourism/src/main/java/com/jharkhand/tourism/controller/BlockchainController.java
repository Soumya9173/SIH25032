package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.BlockchainTransactionRequest;
import com.jharkhand.tourism.dto.BlockchainTransactionResponse;
import com.jharkhand.tourism.dto.GuideVerificationRequest;
import com.jharkhand.tourism.dto.GuideVerificationResponse;
import com.jharkhand.tourism.service.BlockchainService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blockchain")
public class BlockchainController {
    
    @Autowired
    private BlockchainService blockchainService;
    
    @PostMapping("/transaction")
    public ResponseEntity<BlockchainTransactionResponse> processTransaction(
            @Valid @RequestBody BlockchainTransactionRequest request) {
        try {
            BlockchainTransactionResponse response = blockchainService.processTransaction(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/verifyGuide")
    public ResponseEntity<GuideVerificationResponse> verifyGuide(
            @Valid @RequestBody GuideVerificationRequest request) {
        try {
            GuideVerificationResponse response = blockchainService.verifyGuide(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

