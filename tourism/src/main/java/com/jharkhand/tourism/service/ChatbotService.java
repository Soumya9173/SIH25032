package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.ChatRequest;
import com.jharkhand.tourism.dto.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ChatbotService {
    
    public ChatResponse processMessage(ChatRequest request) {
        // TODO: Integrate with Gemini API for real AI-powered multilingual responses
        // For now, return mock responses with multilingual support
        
        String response = generateMockResponse(request);
        List<String> suggestions = generateSuggestions(request);
        
        ChatResponse chatResponse = new ChatResponse();
        chatResponse.setResponse(response);
        chatResponse.setLanguage(request.getLanguage());
        chatResponse.setSuggestions(suggestions);
        chatResponse.setContext(request.getContext());
        chatResponse.setMultilingual(true);
        
        return chatResponse;
    }
    
    private String generateMockResponse(ChatRequest request) {
        String message = request.getMessage() == null ? "" : request.getMessage().toLowerCase();
        String language = request.getLanguage() == null ? "en" : request.getLanguage();

        // 1) Prefer explicit context when provided
        String context = request.getContext();
        if (context != null && !context.isBlank()) {
            switch (context.toLowerCase()) {
                case "accommodation":
                    return getAccommodationResponse(language);
                case "transport":
                    return getTransportResponse(language);
                case "tourism":
                case "places":
                    return getPlacesResponse(language);
                case "food":
                case "cuisine":
                    return getFoodResponse(language);
                case "culture":
                case "tribal":
                    return getCultureResponse(language);
                default:
                    // fall through to keyword detection
            }
        }

        // 2) Keyword detection with expanded synonyms
        if (containsAny(message, "hotel", "accommodation", "stay", "homestay", "resort", "lodge")) {
            return getAccommodationResponse(language);
        }
        if (containsAny(message, "transport", "travel", "bus", "train", "taxi", "cab", "car rental")) {
            return getTransportResponse(language);
        }
        if (containsAny(message, "places", "visit", "tourist", "attraction", "spot", "where to go")) {
            return getPlacesResponse(language);
        }
        if (containsAny(message, "food", "cuisine", "restaurant", "eat", "local dishes", "street food")) {
            return getFoodResponse(language);
        }
        if (containsAny(message, "culture", "tribal", "festival", "handicraft", "dance", "music")) {
            return getCultureResponse(language);
        }

        // 3) Fallback generic
        return getGeneralResponse(language);
    }

    private boolean containsAny(String text, String... needles) {
        for (String n : needles) {
            if (text.contains(n)) {
                return true;
            }
        }
        return false;
    }
    
    private String getAccommodationResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड में कई अच्छे होटल और होमस्टे उपलब्ध हैं। रांची, जमशेदपुर और धनबाद में बजट से लेकर लक्जरी तक के विकल्प मिलते हैं।";
            case "tribal":
                return "Jharkhand re hotel homestay bahut achha hai. Ranchi, Jamshedpur me budget se luxury tak sab milta hai.";
            default:
                return "Jharkhand offers various accommodation options from budget hotels to luxury resorts. Popular areas include Ranchi, Jamshedpur, and Dhanbad with homestays and eco-resorts available.";
        }
    }
    
    private String getTransportResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड में बस, ट्रेन और टैक्सी सेवाएं उपलब्ध हैं। राज्य परिवहन निगम की बसें सभी प्रमुख शहरों को जोड़ती हैं।";
            case "tribal":
                return "Jharkhand me bus, train, taxi sab milta hai. State transport bus sab jagah jata hai.";
            default:
                return "Jharkhand has good connectivity through buses, trains, and taxis. State transport buses connect all major cities. Private taxis and car rentals are also available.";
        }
    }
    
    private String getPlacesResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड में देखने लायक जगहें: बेतला नेशनल पार्क, हजारीबाग वन्यजीव अभयारण्य, नेतरहाट, दासम फॉल्स, जोन्हा फॉल्स।";
            case "tribal":
                return "Jharkhand me dekhne layak jagah: Betla National Park, Hazaribagh Wildlife, Netarhat, Dassam Falls, Jonha Falls.";
            default:
                return "Must-visit places in Jharkhand: Betla National Park, Hazaribagh Wildlife Sanctuary, Netarhat, Dassam Falls, Jonha Falls, Tribal Museum Ranchi, and Jagannath Temple.";
        }
    }
    
    private String getFoodResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड की प्रसिद्ध व्यंजन: ढुस्का, लिट्टी-चोखा, पिठ्ठा, चिल्का रोटी, और स्थानीय मछली व्यंजन।";
            case "tribal":
                return "Jharkhand ke famous food: Dhuska, Litti-Chokha, Pittha, Chilka Roti, aur local fish dishes.";
            default:
                return "Famous Jharkhand cuisine includes Dhuska, Litti-Chokha, Pittha, Chilka Roti, and local fish dishes. Don't miss the tribal cuisine and local sweets.";
        }
    }
    
    private String getCultureResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड की समृद्ध आदिवासी संस्कृति है। यहाँ 32 से अधिक जनजातियाँ रहती हैं। सरहुल, करम, और सोहराय जैसे त्योहार मनाए जाते हैं।";
            case "tribal":
                return "Jharkhand me rich tribal culture hai. 32 se jyada tribes rehte hain. Sarhul, Karma, Sohrai festival manate hain.";
            default:
                return "Jharkhand has a rich tribal culture with over 32 tribes. Major festivals include Sarhul, Karma, and Sohrai. Traditional handicrafts, music, and dance are integral parts of the culture.";
        }
    }
    
    private String getGeneralResponse(String language) {
        switch (language) {
            case "hi":
                return "झारखंड में आपका स्वागत है! मैं आपकी यात्रा में सहायता कर सकता हूँ। आप होटल, परिवहन, पर्यटन स्थल या स्थानीय संस्कृति के बारे में पूछ सकते हैं।";
            case "tribal":
                return "Jharkhand me aapka swagat hai! Main aapki yatra me help kar sakta hun. Hotel, transport, tourist places ya local culture ke bare me puch sakte hain.";
            default:
                return "Welcome to Jharkhand! I can help you with your travel plans. You can ask about hotels, transport, tourist places, local cuisine, or cultural information.";
        }
    }
    
    private List<String> generateSuggestions(ChatRequest request) {
        String context = request.getContext();
        
        if (context != null) {
            switch (context.toLowerCase()) {
                case "accommodation":
                    return Arrays.asList("Budget hotels", "Luxury resorts", "Homestays", "Eco-resorts");
                case "transport":
                    return Arrays.asList("Bus routes", "Train schedules", "Taxi booking", "Car rental");
                case "tourism":
                    return Arrays.asList("National parks", "Waterfalls", "Temples", "Tribal villages");
                case "food":
                    return Arrays.asList("Local cuisine", "Restaurants", "Street food", "Tribal dishes");
                default:
                    return Arrays.asList("Popular places", "Best time to visit", "Local culture", "Travel tips");
            }
        }
        
        return Arrays.asList("Accommodation", "Transport", "Tourist places", "Local food", "Cultural events");
    }
}

