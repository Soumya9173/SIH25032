package com.jharkhand.tourism.service;

import com.jharkhand.tourism.entity.Homestay;
import com.jharkhand.tourism.repository.HomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomestayService {
    
    @Autowired
    private HomestayRepository homestayRepository;
    
    public List<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }
    
    public Homestay getHomestayById(Long id) {
        Optional<Homestay> homestay = homestayRepository.findById(id);
        return homestay.orElse(null);
    }
    
    public List<Homestay> getHomestaysByLocation(String location) {
        return homestayRepository.findByLocation(location);
    }
    
    public List<Homestay> getAvailableHomestays() {
        return homestayRepository.findByIsAvailableTrue();
    }
    
    public List<Homestay> getHomestaysByGuestCapacity(Integer guests) {
        return homestayRepository.findByMaxGuestsGreaterThanEqual(guests);
    }
    
    public List<Homestay> getHomestaysByMaxPrice(Double maxPrice) {
        return homestayRepository.findByPricePerNightLessThanEqual(maxPrice);
    }
    
    public List<Homestay> searchHomestays(String query) {
        return homestayRepository.findByNameContainingIgnoreCase(query);
    }
    
    public Homestay createHomestay(Homestay homestay) {
        return homestayRepository.save(homestay);
    }
    
    public Homestay updateHomestay(Long id, Homestay homestayDetails) {
        Optional<Homestay> optionalHomestay = homestayRepository.findById(id);
        if (optionalHomestay.isPresent()) {
            Homestay homestay = optionalHomestay.get();
            homestay.setName(homestayDetails.getName());
            homestay.setDescription(homestayDetails.getDescription());
            homestay.setOwnerName(homestayDetails.getOwnerName());
            homestay.setOwnerContact(homestayDetails.getOwnerContact());
            homestay.setAddress(homestayDetails.getAddress());
            homestay.setLocation(homestayDetails.getLocation());
            homestay.setLatitude(homestayDetails.getLatitude());
            homestay.setLongitude(homestayDetails.getLongitude());
            homestay.setPricePerNight(homestayDetails.getPricePerNight());
            homestay.setMaxGuests(homestayDetails.getMaxGuests());
            homestay.setAmenities(homestayDetails.getAmenities());
            homestay.setRoomType(homestayDetails.getRoomType());
            homestay.setImageUrls(homestayDetails.getImageUrls());
            homestay.setRating(homestayDetails.getRating());
            homestay.setTotalReviews(homestayDetails.getTotalReviews());
            homestay.setIsAvailable(homestayDetails.getIsAvailable());
            
            return homestayRepository.save(homestay);
        }
        return null;
    }
    
    public boolean deleteHomestay(Long id) {
        if (homestayRepository.existsById(id)) {
            homestayRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

