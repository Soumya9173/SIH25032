package com.jharkhand.tourism.dto;

import com.jharkhand.tourism.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackResponse {
    private Long feedbackId;
    private String feedbackText;
    private Integer rating;
    private String category;
    private Long entityId;
    private String entityType;
    private Feedback.Sentiment sentiment;
    private Double sentimentScore;
    private String message;
    private boolean isVerified;
}

