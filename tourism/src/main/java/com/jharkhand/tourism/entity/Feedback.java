package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "feedback_text", columnDefinition = "TEXT")
    private String feedbackText;
    
    @Column(name = "rating")
    private Integer rating; // 1-5 scale
    
    @Column(name = "sentiment")
    @Enumerated(EnumType.STRING)
    private Sentiment sentiment;
    
    @Column(name = "sentiment_score")
    private Double sentimentScore; // AI-generated sentiment score
    
    @Column(name = "category")
    private String category; // accommodation, tour, event, product, general
    
    @Column(name = "entity_id")
    private Long entityId; // ID of the related entity (product, event, etc.)
    
    @Column(name = "entity_type")
    private String entityType; // Product, Event, Homestay, EcoTour
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum Sentiment {
        POSITIVE, NEGATIVE, NEUTRAL
    }
}

