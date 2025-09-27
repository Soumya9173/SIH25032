package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.entity.Homestay;
import com.jharkhand.tourism.service.HomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace/homestays")
public class HomestayController {
    
    @Autowired
    private HomestayService homestayService;
    
    @GetMapping
    public ResponseEntity<List<Homestay>> getAllHomestays() {
        List<Homestay> homestays = homestayService.getAllHomestays();
        return ResponseEntity.ok(homestays);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Homestay> getHomestayById(@PathVariable Long id) {
        Homestay homestay = homestayService.getHomestayById(id);
        if (homestay != null) {
            return ResponseEntity.ok(homestay);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Homestay>> getHomestaysByLocation(@PathVariable String location) {
        List<Homestay> homestays = homestayService.getHomestaysByLocation(location);
        return ResponseEntity.ok(homestays);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Homestay>> getAvailableHomestays() {
        List<Homestay> homestays = homestayService.getAvailableHomestays();
        return ResponseEntity.ok(homestays);
    }
    
    @GetMapping("/guests/{guests}")
    public ResponseEntity<List<Homestay>> getHomestaysByGuestCapacity(@PathVariable Integer guests) {
        List<Homestay> homestays = homestayService.getHomestaysByGuestCapacity(guests);
        return ResponseEntity.ok(homestays);
    }
    
    @GetMapping("/price/{maxPrice}")
    public ResponseEntity<List<Homestay>> getHomestaysByMaxPrice(@PathVariable Double maxPrice) {
        List<Homestay> homestays = homestayService.getHomestaysByMaxPrice(maxPrice);
        return ResponseEntity.ok(homestays);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Homestay>> searchHomestays(@RequestParam String query) {
        List<Homestay> homestays = homestayService.searchHomestays(query);
        return ResponseEntity.ok(homestays);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('GUIDE')")
    public ResponseEntity<Homestay> createHomestay(@RequestBody Homestay homestay) {
        Homestay createdHomestay = homestayService.createHomestay(homestay);
        return ResponseEntity.ok(createdHomestay);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GUIDE')")
    public ResponseEntity<Homestay> updateHomestay(@PathVariable Long id, @RequestBody Homestay homestay) {
        Homestay updatedHomestay = homestayService.updateHomestay(id, homestay);
        if (updatedHomestay != null) {
            return ResponseEntity.ok(updatedHomestay);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteHomestay(@PathVariable Long id) {
        boolean deleted = homestayService.deleteHomestay(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

