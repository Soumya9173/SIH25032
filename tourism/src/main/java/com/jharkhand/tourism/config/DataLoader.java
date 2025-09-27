package com.jharkhand.tourism.config;

import com.jharkhand.tourism.entity.*;
import com.jharkhand.tourism.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private HomestayRepository homestayRepository;
    
    @Autowired
    private EcoTourRepository ecoTourRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        loadSampleData();
    }
    
    private void loadSampleData() {
        // Load sample users
        loadSampleUsers();
        
        // Load sample products
        loadSampleProducts();
        
        // Load sample events
        loadSampleEvents();
        
        // Load sample homestays
        loadSampleHomestays();
        
        // Load sample eco tours
        loadSampleEcoTours();
        
        System.out.println("Sample data loaded successfully!");
    }
    
    private void loadSampleUsers() {
        if (userRepository.count() == 0) {
            // Admin user
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@jharkhandtourism.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            admin.setPhoneNumber("9876543210");
            userRepository.save(admin);
            
            // Guide user
            User guide = new User();
            guide.setName("Rajesh Kumar");
            guide.setEmail("guide@jharkhandtourism.com");
            guide.setPassword(passwordEncoder.encode("guide123"));
            guide.setRole(User.Role.GUIDE);
            guide.setPhoneNumber("9876543211");
            userRepository.save(guide);
            
            // Tourist user
            User tourist = new User();
            tourist.setName("Priya Sharma");
            tourist.setEmail("tourist@jharkhandtourism.com");
            tourist.setPassword(passwordEncoder.encode("tourist123"));
            tourist.setRole(User.Role.TOURIST);
            tourist.setPhoneNumber("9876543212");
            userRepository.save(tourist);
        }
    }
    
    private void loadSampleProducts() {
        if (productRepository.count() == 0) {
            // Handicraft products
            Product product1 = new Product();
            product1.setName("Tribal Wooden Mask");
            product1.setDescription("Handcrafted wooden mask by local tribal artisans");
            product1.setPrice(new BigDecimal("850.00"));
            product1.setCategory("handicrafts");
            product1.setImageUrl("https://example.com/wooden-mask.jpg");
            product1.setStockQuantity(25);
            product1.setIsAvailable(true);
            product1.setSellerName("Tribal Art Gallery");
            product1.setSellerContact("9876543213");
            product1.setLocation("Ranchi");
            productRepository.save(product1);
            
            Product product2 = new Product();
            product2.setName("Bamboo Basket Set");
            product2.setDescription("Traditional bamboo baskets for home decoration");
            product2.setPrice(new BigDecimal("450.00"));
            product2.setCategory("handicrafts");
            product2.setImageUrl("https://example.com/bamboo-basket.jpg");
            product2.setStockQuantity(40);
            product2.setIsAvailable(true);
            product2.setSellerName("Eco Crafts");
            product2.setSellerContact("9876543214");
            product2.setLocation("Jamshedpur");
            productRepository.save(product2);
            
            Product product3 = new Product();
            product3.setName("Stone Jewelry Set");
            product3.setDescription("Beautiful stone jewelry made from local stones");
            product3.setPrice(new BigDecimal("1200.00"));
            product3.setCategory("jewelry");
            product3.setImageUrl("https://example.com/stone-jewelry.jpg");
            product3.setStockQuantity(15);
            product3.setIsAvailable(true);
            product3.setSellerName("Mountain Gems");
            product3.setSellerContact("9876543215");
            product3.setLocation("Netarhat");
            productRepository.save(product3);
        }
    }
    
    private void loadSampleEvents() {
        if (eventRepository.count() == 0) {
            // Cultural events
            Event event1 = new Event();
            event1.setName("Sarhul Festival");
            event1.setDescription("Traditional tribal festival celebrating nature and harvest");
            event1.setEventType("cultural");
            event1.setStartDate(LocalDateTime.now().plusDays(30));
            event1.setEndDate(LocalDateTime.now().plusDays(32));
            event1.setVenue("Tribal Cultural Center");
            event1.setLocation("Ranchi");
            event1.setLatitude(23.3441);
            event1.setLongitude(85.3096);
            event1.setTicketPrice(new BigDecimal("200.00"));
            event1.setMaxAttendees(500);
            event1.setCurrentAttendees(0);
            event1.setOrganizerName("Jharkhand Tourism Board");
            event1.setOrganizerContact("0651-1234567");
            event1.setImageUrl("https://example.com/sarhul-festival.jpg");
            event1.setIsActive(true);
            eventRepository.save(event1);
            
            Event event2 = new Event();
            event2.setName("Wildlife Photography Workshop");
            event2.setDescription("Learn wildlife photography in Betla National Park");
            event2.setEventType("adventure");
            event2.setStartDate(LocalDateTime.now().plusDays(45));
            event2.setEndDate(LocalDateTime.now().plusDays(47));
            event2.setVenue("Betla National Park");
            event2.setLocation("Palamu");
            event2.setLatitude(23.9000);
            event2.setLongitude(84.2000);
            event2.setTicketPrice(new BigDecimal("1500.00"));
            event2.setMaxAttendees(20);
            event2.setCurrentAttendees(0);
            event2.setOrganizerName("Wildlife Photography Club");
            event2.setOrganizerContact("0651-2345678");
            event2.setImageUrl("https://example.com/wildlife-workshop.jpg");
            event2.setIsActive(true);
            eventRepository.save(event2);
        }
    }
    
    private void loadSampleHomestays() {
        if (homestayRepository.count() == 0) {
            // Homestay options
            Homestay homestay1 = new Homestay();
            homestay1.setName("Mountain View Homestay");
            homestay1.setDescription("Comfortable homestay with beautiful mountain views");
            homestay1.setOwnerName("Ram Singh");
            homestay1.setOwnerContact("9876543216");
            homestay1.setAddress("Netarhat Hills, Latehar");
            homestay1.setLocation("Netarhat");
            homestay1.setLatitude(23.4833);
            homestay1.setLongitude(84.2667);
            homestay1.setPricePerNight(new BigDecimal("1200.00"));
            homestay1.setMaxGuests(4);
            homestay1.setAmenities("WiFi, Hot Water, Parking, Garden");
            homestay1.setRoomType("family");
            homestay1.setImageUrls("[\"https://example.com/homestay1-1.jpg\", \"https://example.com/homestay1-2.jpg\"]");
            homestay1.setRating(4.5);
            homestay1.setTotalReviews(25);
            homestay1.setIsAvailable(true);
            homestayRepository.save(homestay1);
            
            Homestay homestay2 = new Homestay();
            homestay2.setName("Tribal Village Homestay");
            homestay2.setDescription("Experience authentic tribal culture and lifestyle");
            homestay2.setOwnerName("Sita Devi");
            homestay2.setOwnerContact("9876543217");
            homestay2.setAddress("Tribal Village, Hazaribagh");
            homestay2.setLocation("Hazaribagh");
            homestay2.setLatitude(24.0000);
            homestay2.setLongitude(85.3500);
            homestay2.setPricePerNight(new BigDecimal("800.00"));
            homestay2.setMaxGuests(6);
            homestay2.setAmenities("Traditional Food, Cultural Programs, Village Tours");
            homestay2.setRoomType("dormitory");
            homestay2.setImageUrls("[\"https://example.com/homestay2-1.jpg\", \"https://example.com/homestay2-2.jpg\"]");
            homestay2.setRating(4.2);
            homestay2.setTotalReviews(18);
            homestay2.setIsAvailable(true);
            homestayRepository.save(homestay2);
        }
    }
    
    private void loadSampleEcoTours() {
        if (ecoTourRepository.count() == 0) {
            // Eco tour options
            EcoTour ecoTour1 = new EcoTour();
            ecoTour1.setName("Betla National Park Safari");
            ecoTour1.setDescription("Wildlife safari in Betla National Park with experienced guide");
            ecoTour1.setTourType("wildlife");
            ecoTour1.setDurationHours(6);
            ecoTour1.setDifficultyLevel("easy");
            ecoTour1.setMaxParticipants(15);
            ecoTour1.setCurrentParticipants(0);
            ecoTour1.setPricePerPerson(new BigDecimal("800.00"));
            ecoTour1.setGuideName("Vikram Singh");
            ecoTour1.setGuideContact("9876543218");
            ecoTour1.setGuideLicense("WLG-2023-001");
            ecoTour1.setMeetingPoint("Betla National Park Gate");
            ecoTour1.setLocation("Palamu");
            ecoTour1.setLatitude(23.9000);
            ecoTour1.setLongitude(84.2000);
            ecoTour1.setIncludes("Transport, Guide, Entry Fees, Refreshments");
            ecoTour1.setExcludes("Lunch, Camera Fees");
            ecoTour1.setImageUrls("[\"https://example.com/safari1-1.jpg\", \"https://example.com/safari1-2.jpg\"]");
            ecoTour1.setRating(4.6);
            ecoTour1.setTotalReviews(32);
            ecoTour1.setIsAvailable(true);
            ecoTourRepository.save(ecoTour1);
            
            EcoTour ecoTour2 = new EcoTour();
            ecoTour2.setName("Netarhat Nature Trek");
            ecoTour2.setDescription("Scenic nature trek through Netarhat hills and forests");
            ecoTour2.setTourType("nature");
            ecoTour2.setDurationHours(8);
            ecoTour2.setDifficultyLevel("moderate");
            ecoTour2.setMaxParticipants(12);
            ecoTour2.setCurrentParticipants(0);
            ecoTour2.setPricePerPerson(new BigDecimal("600.00"));
            ecoTour2.setGuideName("Anita Kumari");
            ecoTour2.setGuideContact("9876543219");
            ecoTour2.setGuideLicense("NTG-2023-002");
            ecoTour2.setMeetingPoint("Netarhat Bus Stand");
            ecoTour2.setLocation("Netarhat");
            ecoTour2.setLatitude(23.4833);
            ecoTour2.setLongitude(84.2667);
            ecoTour2.setIncludes("Guide, Trekking Equipment, Lunch, Water");
            ecoTour2.setExcludes("Transport to Netarhat");
            ecoTour2.setImageUrls("[\"https://example.com/trek1-1.jpg\", \"https://example.com/trek1-2.jpg\"]");
            ecoTour2.setRating(4.4);
            ecoTour2.setTotalReviews(28);
            ecoTour2.setIsAvailable(true);
            ecoTourRepository.save(ecoTour2);
        }
    }
}

