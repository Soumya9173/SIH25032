package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "itineraries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "preferences", columnDefinition = "TEXT")
    private String preferences; // JSON string containing budget, duration, interests
    
    @Column(name = "generated_plan", columnDefinition = "TEXT")
    private String generatedPlan; // AI-generated itinerary plan
    
    @Column(name = "budget")
    private Double budget;
    
    @Column(name = "duration_days")
    private Integer durationDays;
    
    @Column(name = "interests")
    private String interests; // Comma-separated interests like "adventure,culture,nature"
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = Status.DRAFT;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum Status {
        DRAFT, GENERATED, CONFIRMED, COMPLETED, CANCELLED
    }
}

