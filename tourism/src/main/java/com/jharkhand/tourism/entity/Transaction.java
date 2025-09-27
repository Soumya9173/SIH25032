package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "transaction_type")
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    
    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "currency")
    private String currency = "INR";
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @Column(name = "blockchain_tx_id")
    private String blockchainTxId; // Blockchain transaction hash
    
    @Column(name = "payment_method")
    private String paymentMethod; // card, upi, wallet, cash
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "entity_id")
    private Long entityId; // ID of the related entity (product, event, etc.)
    
    @Column(name = "entity_type")
    private String entityType; // Product, Event, Homestay, EcoTour
    
    @Column(name = "reference_id")
    private String referenceId; // External payment gateway reference
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = Status.PENDING;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum TransactionType {
        BOOKING, PURCHASE, REFUND, COMMISSION
    }
    
    public enum Status {
        PENDING, COMPLETED, FAILED, CANCELLED, REFUNDED
    }
}

