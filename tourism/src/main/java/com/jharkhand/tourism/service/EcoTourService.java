package com.jharkhand.tourism.service;

import com.jharkhand.tourism.entity.EcoTour;
import com.jharkhand.tourism.repository.EcoTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EcoTourService {
    
    @Autowired
    private EcoTourRepository ecoTourRepository;
    
    public List<EcoTour> getAllEcoTours() {
        return ecoTourRepository.findAll();
    }
    
    public EcoTour getEcoTourById(Long id) {
        Optional<EcoTour> ecoTour = ecoTourRepository.findById(id);
        return ecoTour.orElse(null);
    }
    
    public List<EcoTour> getEcoToursByType(String tourType) {
        return ecoTourRepository.findByTourType(tourType);
    }
    
    public List<EcoTour> getEcoToursByLocation(String location) {
        return ecoTourRepository.findByLocation(location);
    }
    
    public List<EcoTour> getAvailableEcoTours() {
        return ecoTourRepository.findByIsAvailableTrue();
    }
    
    public List<EcoTour> getEcoToursByDifficulty(String difficultyLevel) {
        return ecoTourRepository.findByDifficultyLevel(difficultyLevel);
    }
    
    public List<EcoTour> getEcoToursByMaxPrice(Double maxPrice) {
        return ecoTourRepository.findByPricePerPersonLessThanEqual(maxPrice);
    }
    
    public List<EcoTour> searchEcoTours(String query) {
        return ecoTourRepository.findByNameContainingIgnoreCase(query);
    }
    
    public EcoTour createEcoTour(EcoTour ecoTour) {
        return ecoTourRepository.save(ecoTour);
    }
    
    public EcoTour updateEcoTour(Long id, EcoTour ecoTourDetails) {
        Optional<EcoTour> optionalEcoTour = ecoTourRepository.findById(id);
        if (optionalEcoTour.isPresent()) {
            EcoTour ecoTour = optionalEcoTour.get();
            ecoTour.setName(ecoTourDetails.getName());
            ecoTour.setDescription(ecoTourDetails.getDescription());
            ecoTour.setTourType(ecoTourDetails.getTourType());
            ecoTour.setDurationHours(ecoTourDetails.getDurationHours());
            ecoTour.setDifficultyLevel(ecoTourDetails.getDifficultyLevel());
            ecoTour.setMaxParticipants(ecoTourDetails.getMaxParticipants());
            ecoTour.setCurrentParticipants(ecoTourDetails.getCurrentParticipants());
            ecoTour.setPricePerPerson(ecoTourDetails.getPricePerPerson());
            ecoTour.setGuideName(ecoTourDetails.getGuideName());
            ecoTour.setGuideContact(ecoTourDetails.getGuideContact());
            ecoTour.setGuideLicense(ecoTourDetails.getGuideLicense());
            ecoTour.setMeetingPoint(ecoTourDetails.getMeetingPoint());
            ecoTour.setLocation(ecoTourDetails.getLocation());
            ecoTour.setLatitude(ecoTourDetails.getLatitude());
            ecoTour.setLongitude(ecoTourDetails.getLongitude());
            ecoTour.setIncludes(ecoTourDetails.getIncludes());
            ecoTour.setExcludes(ecoTourDetails.getExcludes());
            ecoTour.setImageUrls(ecoTourDetails.getImageUrls());
            ecoTour.setRating(ecoTourDetails.getRating());
            ecoTour.setTotalReviews(ecoTourDetails.getTotalReviews());
            ecoTour.setIsAvailable(ecoTourDetails.getIsAvailable());
            
            return ecoTourRepository.save(ecoTour);
        }
        return null;
    }
    
    public boolean deleteEcoTour(Long id) {
        if (ecoTourRepository.existsById(id)) {
            ecoTourRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

