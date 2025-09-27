package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByLocation(String location);
    List<Product> findByIsAvailableTrue();
    List<Product> findByNameContainingIgnoreCase(String name);
}

