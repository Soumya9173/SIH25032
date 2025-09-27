package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideVerificationResponse {
    private String verificationId;
    private String guideId;
    private String blockchainTxId;
    private boolean isVerified;
    private String verificationStatus;
    private String message;
    private Long timestamp;
    private String certificateHash;
}

