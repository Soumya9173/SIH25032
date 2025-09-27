package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.dto.FeedbackRequest;
import com.jharkhand.tourism.dto.FeedbackResponse;
import com.jharkhand.tourism.entity.Feedback;
import com.jharkhand.tourism.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;
    
    @PostMapping("/submit")
    public ResponseEntity<FeedbackResponse> submitFeedback(@Valid @RequestBody FeedbackRequest request) {
        try {
            FeedbackResponse response = feedbackService.submitFeedback(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Feedback>> getFeedbacksByCategory(@PathVariable String category) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByCategory(category);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/sentiment/{sentiment}")
    public ResponseEntity<List<Feedback>> getFeedbacksBySentiment(@PathVariable String sentiment) {
        try {
            Feedback.Sentiment sentimentEnum = Feedback.Sentiment.valueOf(sentiment.toUpperCase());
            List<Feedback> feedbacks = feedbackService.getFeedbacksBySentiment(sentimentEnum);
            return ResponseEntity.ok(feedbacks);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/entity/{entityId}/{entityType}")
    public ResponseEntity<List<Feedback>> getFeedbacksByEntity(@PathVariable Long entityId, @PathVariable String entityType) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByEntity(entityId, entityType);
        return ResponseEntity.ok(feedbacks);
    }
}

