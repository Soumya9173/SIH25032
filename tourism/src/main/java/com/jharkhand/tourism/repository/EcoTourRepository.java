package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.EcoTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EcoTourRepository extends JpaRepository<EcoTour, Long> {
    List<EcoTour> findByTourType(String tourType);
    List<EcoTour> findByLocation(String location);
    List<EcoTour> findByIsAvailableTrue();
    List<EcoTour> findByDifficultyLevel(String difficultyLevel);
    List<EcoTour> findByPricePerPersonLessThanEqual(Double maxPrice);
    List<EcoTour> findByNameContainingIgnoreCase(String name);
}

