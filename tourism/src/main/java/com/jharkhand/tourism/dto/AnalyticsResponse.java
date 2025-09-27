package com.jharkhand.tourism.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private DashboardStats dashboardStats;
    private List<SentimentTrend> sentimentTrends;
    private List<PopularDestination> popularDestinations;
    private List<RevenueData> revenueData;
    private Map<String, Integer> userStats;
    private Map<String, Integer> bookingStats;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardStats {
        private Long totalTourists;
        private Long totalBookings;
        private Long totalFeedback;
        private Double averageRating;
        private Long activeUsers;
        private Long totalRevenue;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SentimentTrend {
        private String date;
        private Integer positiveCount;
        private Integer negativeCount;
        private Integer neutralCount;
        private Double averageSentimentScore;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PopularDestination {
        private String location;
        private Integer visitCount;
        private Double averageRating;
        private Integer totalBookings;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevenueData {
        private String month;
        private Double revenue;
        private Integer bookingCount;
        private String category;
    }
}

