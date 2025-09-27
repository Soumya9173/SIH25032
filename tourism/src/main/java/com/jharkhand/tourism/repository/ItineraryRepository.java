package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Itinerary;
import com.jharkhand.tourism.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    List<Itinerary> findByUser(User user);
    List<Itinerary> findByUserId(Long userId);
    List<Itinerary> findByStatus(Itinerary.Status status);
}

