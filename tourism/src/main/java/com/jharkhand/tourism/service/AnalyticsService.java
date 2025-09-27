package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.AnalyticsResponse;
import com.jharkhand.tourism.entity.Feedback;
import com.jharkhand.tourism.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AnalyticsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ItineraryRepository itineraryRepository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private HomestayRepository homestayRepository;
    
    @Autowired
    private EcoTourRepository ecoTourRepository;
    
    public AnalyticsResponse getAnalyticsDashboard() {
        // TODO: Implement real analytics with proper data aggregation
        // For now, return mock analytics data
        
        AnalyticsResponse response = new AnalyticsResponse();
        
        // Dashboard Stats
        AnalyticsResponse.DashboardStats stats = new AnalyticsResponse.DashboardStats();
        stats.setTotalTourists(1250L);
        stats.setTotalBookings(3420L);
        stats.setTotalFeedback(890L);
        stats.setAverageRating(4.2);
        stats.setActiveUsers(156L);
        stats.setTotalRevenue(1250000L);
        response.setDashboardStats(stats);
        
        // Sentiment Trends (last 7 days)
        List<AnalyticsResponse.SentimentTrend> sentimentTrends = generateMockSentimentTrends();
        response.setSentimentTrends(sentimentTrends);
        
        // Popular Destinations
        List<AnalyticsResponse.PopularDestination> popularDestinations = generateMockPopularDestinations();
        response.setPopularDestinations(popularDestinations);
        
        // Revenue Data (last 6 months)
        List<AnalyticsResponse.RevenueData> revenueData = generateMockRevenueData();
        response.setRevenueData(revenueData);
        
        // User Stats
        Map<String, Integer> userStats = generateMockUserStats();
        response.setUserStats(userStats);
        
        // Booking Stats
        Map<String, Integer> bookingStats = generateMockBookingStats();
        response.setBookingStats(bookingStats);
        
        return response;
    }
    
    private List<AnalyticsResponse.SentimentTrend> generateMockSentimentTrends() {
        List<AnalyticsResponse.SentimentTrend> trends = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        
        for (int i = 6; i >= 0; i--) {
            LocalDateTime date = now.minusDays(i);
            AnalyticsResponse.SentimentTrend trend = new AnalyticsResponse.SentimentTrend();
            trend.setDate(date.format(formatter));
            trend.setPositiveCount(45 + (int)(Math.random() * 20));
            trend.setNegativeCount(5 + (int)(Math.random() * 10));
            trend.setNeutralCount(15 + (int)(Math.random() * 15));
            trend.setAverageSentimentScore(0.6 + Math.random() * 0.3);
            trends.add(trend);
        }
        
        return trends;
    }
    
    private List<AnalyticsResponse.PopularDestination> generateMockPopularDestinations() {
        List<AnalyticsResponse.PopularDestination> destinations = new ArrayList<>();
        
        destinations.add(new AnalyticsResponse.PopularDestination("Ranchi", 450, 4.3, 120));
        destinations.add(new AnalyticsResponse.PopularDestination("Jamshedpur", 380, 4.1, 95));
        destinations.add(new AnalyticsResponse.PopularDestination("Dhanbad", 320, 4.0, 85));
        destinations.add(new AnalyticsResponse.PopularDestination("Netarhat", 280, 4.5, 70));
        destinations.add(new AnalyticsResponse.PopularDestination("Hazaribagh", 250, 4.2, 65));
        destinations.add(new AnalyticsResponse.PopularDestination("Betla National Park", 220, 4.4, 55));
        
        return destinations;
    }
    
    private List<AnalyticsResponse.RevenueData> generateMockRevenueData() {
        List<AnalyticsResponse.RevenueData> revenueData = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        String[] categories = {"Accommodation", "Tours", "Events", "Products"};
        
        for (String month : months) {
            for (String category : categories) {
                AnalyticsResponse.RevenueData data = new AnalyticsResponse.RevenueData();
                data.setMonth(month);
                data.setRevenue(50000.0 + Math.random() * 100000.0);
                data.setBookingCount(50 + (int)(Math.random() * 100));
                data.setCategory(category);
                revenueData.add(data);
            }
        }
        
        return revenueData;
    }
    
    private Map<String, Integer> generateMockUserStats() {
        Map<String, Integer> userStats = new HashMap<>();
        userStats.put("Total Users", 1250);
        userStats.put("Active Users (30 days)", 156);
        userStats.put("New Users (7 days)", 45);
        userStats.put("Tourists", 980);
        userStats.put("Guides", 45);
        userStats.put("Admins", 5);
        return userStats;
    }
    
    private Map<String, Integer> generateMockBookingStats() {
        Map<String, Integer> bookingStats = new HashMap<>();
        bookingStats.put("Total Bookings", 3420);
        bookingStats.put("Completed Bookings", 2980);
        bookingStats.put("Pending Bookings", 320);
        bookingStats.put("Cancelled Bookings", 120);
        bookingStats.put("Homestay Bookings", 1200);
        bookingStats.put("EcoTour Bookings", 850);
        bookingStats.put("Event Bookings", 980);
        bookingStats.put("Product Orders", 390);
        return bookingStats;
    }
}

