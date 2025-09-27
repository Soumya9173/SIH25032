package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.LocationRequest;
import com.jharkhand.tourism.dto.LocationResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {
    
    public LocationResponse findNearbyPlaces(LocationRequest request) {
        // TODO: Integrate with Google Maps API for real location data
        // For now, return mock nearby places based on coordinates
        
        List<LocationResponse.NearbyPlace> nearbyPlaces = generateMockNearbyPlaces(request);
        
        LocationResponse response = new LocationResponse();
        response.setNearbyPlaces(nearbyPlaces);
        response.setStatus("SUCCESS");
        response.setMessage("Nearby places found successfully");
        response.setUserLatitude(request.getLatitude());
        response.setUserLongitude(request.getLongitude());
        response.setSearchRadius(request.getRadius());
        
        return response;
    }
    
    private List<LocationResponse.NearbyPlace> generateMockNearbyPlaces(LocationRequest request) {
        List<LocationResponse.NearbyPlace> places = new ArrayList<>();
        
        // Mock data for Jharkhand tourist attractions
        // These are real coordinates for popular places in Jharkhand
        
        // Ranchi area (around 23.3441° N, 85.3096° E)
        if (isNearRanchi(request.getLatitude(), request.getLongitude())) {
            places.add(createMockPlace("Ranchi Lake", "Ranchi Lake, Ranchi, Jharkhand", 
                    23.3441, 85.3096, "tourist_attraction", 0.5, 
                    "Beautiful lake in the heart of Ranchi city", "0651-1234567", 4.2, 
                    "https://example.com/ranchi-lake.jpg", "6:00 AM - 8:00 PM"));
            
            places.add(createMockPlace("Jagannath Temple", "Jagannath Temple, Ranchi", 
                    23.3500, 85.3200, "religious", 1.2, 
                    "Ancient temple dedicated to Lord Jagannath", "0651-2345678", 4.5, 
                    "https://example.com/jagannath-temple.jpg", "5:00 AM - 9:00 PM"));
            
            places.add(createMockPlace("Tribal Museum", "Tribal Research Institute, Ranchi", 
                    23.3400, 85.3000, "museum", 0.8, 
                    "Museum showcasing tribal culture and artifacts", "0651-3456789", 4.0, 
                    "https://example.com/tribal-museum.jpg", "10:00 AM - 5:00 PM"));
        }
        
        // Jamshedpur area (around 22.8046° N, 86.2029° E)
        if (isNearJamshedpur(request.getLatitude(), request.getLongitude())) {
            places.add(createMockPlace("Jubilee Park", "Jubilee Park, Jamshedpur", 
                    22.8046, 86.2029, "park", 0.3, 
                    "Beautiful park with fountains and gardens", "0657-1234567", 4.3, 
                    "https://example.com/jubilee-park.jpg", "5:00 AM - 10:00 PM"));
            
            places.add(createMockPlace("Tata Steel Zoological Park", "Jamshedpur Zoo", 
                    22.8100, 86.2100, "zoo", 1.5, 
                    "Well-maintained zoo with various animal species", "0657-2345678", 4.1, 
                    "https://example.com/jamshedpur-zoo.jpg", "9:00 AM - 5:00 PM"));
        }
        
        // Dhanbad area (around 23.7957° N, 86.4304° E)
        if (isNearDhanbad(request.getLatitude(), request.getLongitude())) {
            places.add(createMockPlace("Maithon Dam", "Maithon Dam, Dhanbad", 
                    23.7957, 86.4304, "tourist_attraction", 2.0, 
                    "Scenic dam with boating facilities", "0326-1234567", 4.4, 
                    "https://example.com/maithon-dam.jpg", "6:00 AM - 6:00 PM"));
        }
        
        // Netarhat area (around 23.4833° N, 84.2667° E)
        if (isNearNetarhat(request.getLatitude(), request.getLongitude())) {
            places.add(createMockPlace("Netarhat Hills", "Netarhat, Latehar", 
                    23.4833, 84.2667, "hill_station", 0.0, 
                    "Beautiful hill station known as 'Queen of Chotanagpur'", "0656-1234567", 4.6, 
                    "https://example.com/netarhat-hills.jpg", "24/7"));
        }
        
        // Add restaurants and hotels based on category (accept singular/plural)
        if (request.getCategory() == null 
                || "restaurants".equalsIgnoreCase(request.getCategory())
                || "restaurant".equalsIgnoreCase(request.getCategory())) {
            places.add(createMockPlace("Local Dhaba", "Main Road, Ranchi", 
                    request.getLatitude() + 0.01, request.getLongitude() + 0.01, "restaurant", 0.8, 
                    "Authentic local cuisine and traditional dishes", "0651-4567890", 4.0, 
                    "https://example.com/local-dhaba.jpg", "7:00 AM - 11:00 PM"));
        }
        
        if (request.getCategory() == null 
                || "hotels".equalsIgnoreCase(request.getCategory())
                || "hotel".equalsIgnoreCase(request.getCategory())) {
            places.add(createMockPlace("Hotel Jharkhand", "Station Road, Ranchi", 
                    request.getLatitude() - 0.01, request.getLongitude() - 0.01, "hotel", 1.2, 
                    "Comfortable accommodation with modern amenities", "0651-5678901", 3.8, 
                    "https://example.com/hotel-jharkhand.jpg", "24/7"));
        }

        // If no city matched and still empty, add a few generic mock places around provided coordinates
        if (places.isEmpty()) {
            double lat = request.getLatitude();
            double lng = request.getLongitude();
            places.add(createMockPlace("Scenic Viewpoint", "Nearby viewpoint",
                    lat + 0.005, lng + 0.005, "tourist_attraction", 0.6,
                    "A nice spot to enjoy the surroundings.", "N/A", 4.2,
                    "https://example.com/viewpoint.jpg", "Open 24 hours"));
            if (request.getCategory() == null || "restaurant".equalsIgnoreCase(request.getCategory()) || "restaurants".equalsIgnoreCase(request.getCategory())) {
                places.add(createMockPlace("Corner Cafe", "Local cafe",
                        lat - 0.004, lng + 0.003, "restaurant", 0.9,
                        "Coffee, snacks and quick bites.", "+91-99999-11111", 4.0,
                        "https://example.com/cafe.jpg", "8:00 AM - 10:00 PM"));
            }
            if (request.getCategory() == null || "hotel".equalsIgnoreCase(request.getCategory()) || "hotels".equalsIgnoreCase(request.getCategory())) {
                places.add(createMockPlace("City Lodge", "Central area",
                        lat + 0.007, lng - 0.006, "hotel", 1.4,
                        "Clean rooms with basic amenities.", "+91-88888-22222", 3.7,
                        "https://example.com/lodge.jpg", "24/7"));
            }
        }
        
        return places;
    }
    
    private LocationResponse.NearbyPlace createMockPlace(String name, String address, 
            Double lat, Double lng, String category, Double distance, String description, 
            String phone, Double rating, String imageUrl, String hours) {
        LocationResponse.NearbyPlace place = new LocationResponse.NearbyPlace();
        place.setName(name);
        place.setAddress(address);
        place.setLatitude(lat);
        place.setLongitude(lng);
        place.setCategory(category);
        place.setDistance(distance);
        place.setDescription(description);
        place.setPhoneNumber(phone);
        place.setRating(rating);
        place.setImageUrl(imageUrl);
        place.setOpeningHours(hours);
        return place;
    }
    
    private boolean isNearRanchi(Double lat, Double lng) {
        return Math.abs(lat - 23.3441) < 0.5 && Math.abs(lng - 85.3096) < 0.5;
    }
    
    private boolean isNearJamshedpur(Double lat, Double lng) {
        return Math.abs(lat - 22.8046) < 0.5 && Math.abs(lng - 86.2029) < 0.5;
    }
    
    private boolean isNearDhanbad(Double lat, Double lng) {
        return Math.abs(lat - 23.7957) < 0.5 && Math.abs(lng - 86.4304) < 0.5;
    }
    
    private boolean isNearNetarhat(Double lat, Double lng) {
        return Math.abs(lat - 23.4833) < 0.5 && Math.abs(lng - 84.2667) < 0.5;
    }
}

