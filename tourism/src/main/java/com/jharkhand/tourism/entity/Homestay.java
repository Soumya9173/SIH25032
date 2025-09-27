package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "homestays")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Homestay {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "owner_name")
    private String ownerName;
    
    @Column(name = "owner_contact")
    private String ownerContact;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "location")
    private String location; // City/District in Jharkhand
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @Column(name = "price_per_night", precision = 10, scale = 2)
    private BigDecimal pricePerNight;
    
    @Column(name = "max_guests")
    private Integer maxGuests;
    
    @Column(name = "amenities")
    private String amenities; // Comma-separated amenities
    
    @Column(name = "room_type")
    private String roomType; // single, double, family, dormitory
    
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

