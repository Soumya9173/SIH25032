package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.FeedbackRequest;
import com.jharkhand.tourism.dto.FeedbackResponse;
import com.jharkhand.tourism.entity.Feedback;
import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.FeedbackRepository;
import com.jharkhand.tourism.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public FeedbackResponse submitFeedback(FeedbackRequest request) {
        // TODO: Integrate with real sentiment analysis API (Google Cloud Natural Language, AWS Comprehend, etc.)
        // For now, return mock sentiment analysis
        
        SentimentAnalysisResult sentimentResult = performMockSentimentAnalysis(request.getFeedbackText());
        
        // Get current user if authenticated
        User user = getCurrentUser();
        
        // Create and save feedback
        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setFeedbackText(request.getFeedbackText());
        feedback.setRating(request.getRating());
        feedback.setSentiment(sentimentResult.getSentiment());
        feedback.setSentimentScore(sentimentResult.getScore());
        feedback.setCategory(request.getCategory());
        feedback.setEntityId(request.getEntityId());
        feedback.setEntityType(request.getEntityType());
        feedback.setIsVerified(false);
        
        Feedback savedFeedback = feedbackRepository.save(feedback);
        
        // Create response
        FeedbackResponse response = new FeedbackResponse();
        response.setFeedbackId(savedFeedback.getId());
        response.setFeedbackText(savedFeedback.getFeedbackText());
        response.setRating(savedFeedback.getRating());
        response.setCategory(savedFeedback.getCategory());
        response.setEntityId(savedFeedback.getEntityId());
        response.setEntityType(savedFeedback.getEntityType());
        response.setSentiment(savedFeedback.getSentiment());
        response.setSentimentScore(savedFeedback.getSentimentScore());
        response.setMessage("Feedback submitted successfully with sentiment analysis");
        response.setVerified(savedFeedback.getIsVerified());
        
        return response;
    }
    
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
    
    public List<Feedback> getFeedbacksByCategory(String category) {
        return feedbackRepository.findByCategory(category);
    }
    
    public List<Feedback> getFeedbacksBySentiment(Feedback.Sentiment sentiment) {
        return feedbackRepository.findBySentiment(sentiment);
    }
    
    public List<Feedback> getFeedbacksByEntity(Long entityId, String entityType) {
        return feedbackRepository.findByEntityIdAndEntityType(entityId, entityType);
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return userRepository.findByEmail(email).orElse(null);
        }
        return null;
    }
    
    private SentimentAnalysisResult performMockSentimentAnalysis(String text) {
        // TODO: Replace with real AI sentiment analysis API integration
        // Mock sentiment analysis based on keywords
        
        String lowerText = text.toLowerCase();
        double positiveScore = 0.0;
        double negativeScore = 0.0;
        
        // Positive keywords
        String[] positiveKeywords = {"good", "great", "excellent", "amazing", "wonderful", "fantastic", 
                                   "beautiful", "love", "enjoyed", "perfect", "awesome", "brilliant", 
                                   "outstanding", "superb", "delicious", "comfortable", "friendly", 
                                   "helpful", "clean", "safe", "recommend", "best", "top"};
        
        // Negative keywords
        String[] negativeKeywords = {"bad", "terrible", "awful", "horrible", "disgusting", "hate", 
                                   "worst", "disappointed", "poor", "dirty", "uncomfortable", 
                                   "rude", "unhelpful", "unsafe", "expensive", "overpriced", 
                                   "slow", "delayed", "cancelled", "broken", "damaged"};
        
        // Count positive keywords
        for (String keyword : positiveKeywords) {
            if (lowerText.contains(keyword)) {
                positiveScore += 1.0;
            }
        }
        
        // Count negative keywords
        for (String keyword : negativeKeywords) {
            if (lowerText.contains(keyword)) {
                negativeScore += 1.0;
            }
        }
        
        // Determine sentiment
        Feedback.Sentiment sentiment;
        double score;
        
        if (positiveScore > negativeScore) {
            sentiment = Feedback.Sentiment.POSITIVE;
            score = Math.min(0.8 + (positiveScore - negativeScore) * 0.1, 1.0);
        } else if (negativeScore > positiveScore) {
            sentiment = Feedback.Sentiment.NEGATIVE;
            score = Math.min(0.8 + (negativeScore - positiveScore) * 0.1, 1.0);
        } else {
            sentiment = Feedback.Sentiment.NEUTRAL;
            score = 0.5;
        }
        
        return new SentimentAnalysisResult(sentiment, score);
    }
    
    private static class SentimentAnalysisResult {
        private final Feedback.Sentiment sentiment;
        private final Double score;
        
        public SentimentAnalysisResult(Feedback.Sentiment sentiment, Double score) {
            this.sentiment = sentiment;
            this.score = score;
        }
        
        public Feedback.Sentiment getSentiment() {
            return sentiment;
        }
        
        public Double getScore() {
            return score;
        }
    }
}

