package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "eco_tours")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EcoTour {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "tour_type")
    private String tourType; // wildlife, nature, adventure, cultural
    
    @Column(name = "duration_hours")
    private Integer durationHours;
    
    @Column(name = "difficulty_level")
    private String difficultyLevel; // easy, moderate, difficult
    
    @Column(name = "max_participants")
    private Integer maxParticipants;
    
    @Column(name = "current_participants")
    private Integer currentParticipants = 0;
    
    @Column(name = "price_per_person", precision = 10, scale = 2)
    private BigDecimal pricePerPerson;
    
    @Column(name = "guide_name")
    private String guideName;
    
    @Column(name = "guide_contact")
    private String guideContact;
    
    @Column(name = "guide_license")
    private String guideLicense;
    
    @Column(name = "meeting_point")
    private String meetingPoint;
    
    @Column(name = "location")
    private String location; // City/District in Jharkhand
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @Column(name = "includes")
    private String includes; // Comma-separated inclusions
    
    @Column(name = "excludes")
    private String excludes; // Comma-separated exclusions
    
    @Column(name = "image_urls")
    private String imageUrls; // JSON array of image URLs
    
    @Column(name = "rating")
    private Double rating = 0.0;
    
    @Column(name = "total_reviews")
    private Integer totalReviews = 0;
    
    @Column(name = "is_available")
    private Boolean isAvailable = true;
    
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
}

