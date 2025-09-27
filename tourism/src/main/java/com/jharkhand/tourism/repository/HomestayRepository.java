package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayRepository extends JpaRepository<Homestay, Long> {
    List<Homestay> findByLocation(String location);
    List<Homestay> findByIsAvailableTrue();
    List<Homestay> findByMaxGuestsGreaterThanEqual(Integer guests);
    List<Homestay> findByPricePerNightLessThanEqual(Double maxPrice);
    List<Homestay> findByNameContainingIgnoreCase(String name);
}

