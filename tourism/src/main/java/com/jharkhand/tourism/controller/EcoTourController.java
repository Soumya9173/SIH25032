package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.entity.EcoTour;
import com.jharkhand.tourism.service.EcoTourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace/ecotours")
public class EcoTourController {
    
    @Autowired
    private EcoTourService ecoTourService;
    
    @GetMapping
    public ResponseEntity<List<EcoTour>> getAllEcoTours() {
        List<EcoTour> ecoTours = ecoTourService.getAllEcoTours();
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EcoTour> getEcoTourById(@PathVariable Long id) {
        EcoTour ecoTour = ecoTourService.getEcoTourById(id);
        if (ecoTour != null) {
            return ResponseEntity.ok(ecoTour);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/type/{tourType}")
    public ResponseEntity<List<EcoTour>> getEcoToursByType(@PathVariable String tourType) {
        List<EcoTour> ecoTours = ecoTourService.getEcoToursByType(tourType);
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/location/{location}")
    public ResponseEntity<List<EcoTour>> getEcoToursByLocation(@PathVariable String location) {
        List<EcoTour> ecoTours = ecoTourService.getEcoToursByLocation(location);
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<EcoTour>> getAvailableEcoTours() {
        List<EcoTour> ecoTours = ecoTourService.getAvailableEcoTours();
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/difficulty/{difficultyLevel}")
    public ResponseEntity<List<EcoTour>> getEcoToursByDifficulty(@PathVariable String difficultyLevel) {
        List<EcoTour> ecoTours = ecoTourService.getEcoToursByDifficulty(difficultyLevel);
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/price/{maxPrice}")
    public ResponseEntity<List<EcoTour>> getEcoToursByMaxPrice(@PathVariable Double maxPrice) {
        List<EcoTour> ecoTours = ecoTourService.getEcoToursByMaxPrice(maxPrice);
        return ResponseEntity.ok(ecoTours);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<EcoTour>> searchEcoTours(@RequestParam String query) {
        List<EcoTour> ecoTours = ecoTourService.searchEcoTours(query);
        return ResponseEntity.ok(ecoTours);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('GUIDE')")
    public ResponseEntity<EcoTour> createEcoTour(@RequestBody EcoTour ecoTour) {
        EcoTour createdEcoTour = ecoTourService.createEcoTour(ecoTour);
        return ResponseEntity.ok(createdEcoTour);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GUIDE')")
    public ResponseEntity<EcoTour> updateEcoTour(@PathVariable Long id, @RequestBody EcoTour ecoTour) {
        EcoTour updatedEcoTour = ecoTourService.updateEcoTour(id, ecoTour);
        if (updatedEcoTour != null) {
            return ResponseEntity.ok(updatedEcoTour);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEcoTour(@PathVariable Long id) {
        boolean deleted = ecoTourService.deleteEcoTour(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

