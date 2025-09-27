package com.jharkhand.tourism.service;

import com.jharkhand.tourism.entity.Event;
import com.jharkhand.tourism.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public Event getEventById(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        return event.orElse(null);
    }
    
    public List<Event> getEventsByType(String eventType) {
        return eventRepository.findByEventType(eventType);
    }
    
    public List<Event> getEventsByLocation(String location) {
        return eventRepository.findByLocation(location);
    }
    
    public List<Event> getActiveEvents() {
        return eventRepository.findByIsActiveTrue();
    }
    
    public List<Event> searchEvents(String query) {
        return eventRepository.findByNameContainingIgnoreCase(query);
    }
    
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
    
    public Event updateEvent(Long id, Event eventDetails) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setName(eventDetails.getName());
            event.setDescription(eventDetails.getDescription());
            event.setEventType(eventDetails.getEventType());
            event.setStartDate(eventDetails.getStartDate());
            event.setEndDate(eventDetails.getEndDate());
            event.setVenue(eventDetails.getVenue());
            event.setLocation(eventDetails.getLocation());
            event.setLatitude(eventDetails.getLatitude());
            event.setLongitude(eventDetails.getLongitude());
            event.setTicketPrice(eventDetails.getTicketPrice());
            event.setMaxAttendees(eventDetails.getMaxAttendees());
            event.setCurrentAttendees(eventDetails.getCurrentAttendees());
            event.setOrganizerName(eventDetails.getOrganizerName());
            event.setOrganizerContact(eventDetails.getOrganizerContact());
            event.setImageUrl(eventDetails.getImageUrl());
            event.setIsActive(eventDetails.getIsActive());
            
            return eventRepository.save(event);
        }
        return null;
    }
    
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

