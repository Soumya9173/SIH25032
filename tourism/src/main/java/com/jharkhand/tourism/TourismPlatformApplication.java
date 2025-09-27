package com.jharkhand.tourism;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TourismPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(TourismPlatformApplication.class, args);
        /*System.out.println("==========================================");
        System.out.println("Jharkhand Tourism Platform Started!");
        System.out.println("Application URL: http://localhost:8080");
        System.out.println("API Documentation: http://localhost:8080/actuator");
        System.out.println("==========================================");
        System.out.println("Sample API Endpoints:");
        System.out.println("POST /api/auth/register - User Registration");
        System.out.println("POST /api/auth/login - User Login");
        System.out.println("POST /api/itinerary/plan - AI Itinerary Planning");
        System.out.println("POST /api/chatbot/ask - Multilingual Chatbot");
        System.out.println("POST /api/location/nearby - Find Nearby Places");
        System.out.println("POST /api/transport/realtime - Transport Information");
        System.out.println("POST /api/feedback/submit - Submit Feedback");
        System.out.println("POST /api/blockchain/transaction - Blockchain Transaction");
        System.out.println("POST /api/blockchain/verifyGuide - Guide Verification");
        System.out.println("GET /api/marketplace/products - Get Products");
        System.out.println("GET /api/marketplace/events - Get Events");
        System.out.println("GET /api/marketplace/homestays - Get Homestays");
        System.out.println("GET /api/marketplace/ecotours - Get Eco Tours");
        System.out.println("GET /api/admin/analytics - Analytics Dashboard (Admin only)");
        System.out.println("==========================================");*/
    }
}
