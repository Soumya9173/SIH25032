package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlockchainTransactionResponse {
    private String transactionId;
    private String blockchainTxId;
    private String status;
    private String message;
    private Long timestamp;
    private String blockHash;
    private Integer confirmations;
}

