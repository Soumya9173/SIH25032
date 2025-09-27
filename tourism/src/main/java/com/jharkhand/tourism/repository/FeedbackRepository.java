package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Feedback;
import com.jharkhand.tourism.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser(User user);
    List<Feedback> findByUserId(Long userId);
    List<Feedback> findByCategory(String category);
    List<Feedback> findByEntityIdAndEntityType(Long entityId, String entityType);
    List<Feedback> findBySentiment(Feedback.Sentiment sentiment);
}

