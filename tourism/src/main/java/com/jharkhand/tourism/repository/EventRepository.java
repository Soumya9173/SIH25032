package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventType(String eventType);
    List<Event> findByLocation(String location);
    List<Event> findByIsActiveTrue();
    List<Event> findByStartDateAfter(LocalDateTime date);
    List<Event> findByNameContainingIgnoreCase(String name);
}

