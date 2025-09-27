package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.ItineraryRequest;
import com.jharkhand.tourism.dto.ItineraryResponse;
import com.jharkhand.tourism.entity.Itinerary;
import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.ItineraryRepository;
import com.jharkhand.tourism.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ItineraryService {
    
    @Autowired
    private ItineraryRepository itineraryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public ItineraryResponse generateItinerary(ItineraryRequest request) {
        // TODO: Integrate with Gemini API for real AI-powered itinerary generation
        // For now, return mock AI-generated itinerary based on preferences
        
        String generatedPlan = generateMockItinerary(request);
        
        // Save itinerary to database
        Itinerary itinerary = new Itinerary();
        itinerary.setPreferences(convertToJson(request));
        itinerary.setGeneratedPlan(generatedPlan);
        itinerary.setBudget(request.getBudget());
        itinerary.setDurationDays(request.getDurationDays());
        itinerary.setInterests(String.join(",", request.getInterests()));
        itinerary.setStatus(Itinerary.Status.GENERATED);
        
        // Get current user if authenticated
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                itinerary.setUser(user);
            }
        }
        
        Itinerary savedItinerary = itineraryRepository.save(itinerary);
        
        return createItineraryResponse(savedItinerary, request);
    }
    
    private String generateMockItinerary(ItineraryRequest request) {
        StringBuilder plan = new StringBuilder();
        plan.append("AI-Generated Itinerary for Jharkhand Tourism\n");
        plan.append("==========================================\n\n");
        
        plan.append("Budget: ₹").append(request.getBudget()).append("\n");
        plan.append("Duration: ").append(request.getDurationDays()).append(" days\n");
        plan.append("Interests: ").append(String.join(", ", request.getInterests())).append("\n\n");
        
        // Generate day-wise plan based on interests
        for (int day = 1; day <= request.getDurationDays(); day++) {
            plan.append("Day ").append(day).append(":\n");
            
            if (request.getInterests().contains("adventure")) {
                plan.append("- Morning: Adventure activity (Rock climbing/Water sports)\n");
                plan.append("- Afternoon: Wildlife safari or nature trek\n");
            } else if (request.getInterests().contains("culture")) {
                plan.append("- Morning: Visit tribal villages and cultural sites\n");
                plan.append("- Afternoon: Explore local handicrafts and traditions\n");
            } else {
                plan.append("- Morning: Visit popular tourist attractions\n");
                plan.append("- Afternoon: Local sightseeing and shopping\n");
            }
            
            plan.append("- Evening: Local cuisine and cultural programs\n\n");
        }
        
        return plan.toString();
    }
    
    private String convertToJson(ItineraryRequest request) {
        // Simple JSON conversion for preferences
        return String.format("{\"budget\":%f,\"duration\":%d,\"interests\":%s,\"location\":\"%s\"}", 
                           request.getBudget(), request.getDurationDays(), 
                           request.getInterests().toString(), request.getPreferredLocation());
    }
    
    private ItineraryResponse createItineraryResponse(Itinerary itinerary, ItineraryRequest request) {
        ItineraryResponse response = new ItineraryResponse();
        response.setItineraryId(itinerary.getId());
        response.setGeneratedPlan(itinerary.getGeneratedPlan());
        response.setEstimatedCost(request.getBudget() * 0.9); // 90% of budget
        response.setDurationDays(request.getDurationDays());
        
        // Mock recommendations based on interests
        if (request.getInterests().contains("adventure")) {
            response.setRecommendedPlaces(Arrays.asList("Betla National Park", "Hazaribagh Wildlife Sanctuary", "Netarhat Hills"));
            response.setRecommendedActivities(Arrays.asList("Jungle Safari", "Rock Climbing", "River Rafting"));
        } else if (request.getInterests().contains("culture")) {
            response.setRecommendedPlaces(Arrays.asList("Tribal Museum Ranchi", "Jagannath Temple", "Pahari Mandir"));
            response.setRecommendedActivities(Arrays.asList("Tribal Village Visit", "Handicraft Shopping", "Cultural Shows"));
        } else {
            response.setRecommendedPlaces(Arrays.asList("Ranchi Lake", "Dassam Falls", "Jonha Falls"));
            response.setRecommendedActivities(Arrays.asList("Sightseeing", "Photography", "Local Cuisine"));
        }
        
        response.setAccommodationSuggestions("Recommended: Budget hotels, homestays, or eco-resorts based on your preference");
        response.setTransportSuggestions("Mix of public transport and private vehicles for flexibility");
        response.setTips("Carry water bottles, comfortable shoes, and camera. Respect local customs and traditions.");
        
        return response;
    }
}

