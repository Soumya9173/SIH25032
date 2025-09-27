package com.jharkhand.tourism.service;

import com.jharkhand.tourism.dto.TransportRequest;
import com.jharkhand.tourism.dto.TransportResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransportService {
    
    public TransportResponse getRealtimeTransportInfo(TransportRequest request) {
        // TODO: Integrate with real transport APIs (IRCTC, state transport, private operators)
        // For now, return mock real-time transport data
        
        List<TransportResponse.TransportOption> options = generateMockTransportOptions(request);
        
        TransportResponse response = new TransportResponse();
        response.setOptions(options);
        response.setStatus("SUCCESS");
        response.setMessage("Transport options found successfully");
        response.setSource(request.getSource());
        response.setDestination(request.getDestination());
        
        return response;
    }
    
    private List<TransportResponse.TransportOption> generateMockTransportOptions(TransportRequest request) {
        List<TransportResponse.TransportOption> options = new ArrayList<>();
        
        String source = request.getSource().toLowerCase();
        String destination = request.getDestination().toLowerCase();
        
        // Mock bus options
        if (request.getTransportType() == null || request.getTransportType().equals("bus")) {
            options.add(createMockBusOption("Jharkhand State Transport", "JS-001", 
                    "08:00", "12:00", "4h 00m", 250.0, 15, "available", 
                    "AC, WiFi, Water", "Direct route via NH-33"));
            
            options.add(createMockBusOption("Red Bus Services", "RB-205", 
                    "14:30", "18:45", "4h 15m", 200.0, 8, "limited", 
                    "Non-AC, Water", "Via Jamshedpur"));
            
            options.add(createMockBusOption("Green Line Travels", "GL-456", 
                    "20:00", "01:30", "5h 30m", 300.0, 25, "available", 
                    "AC, WiFi, Snacks", "Night service"));
        }
        
        // Mock train options
        if (request.getTransportType() == null || request.getTransportType().equals("train")) {
            options.add(createMockTrainOption("Indian Railways", "18626", 
                    "06:15", "11:30", "5h 15m", 180.0, 45, "available", 
                    "General, Sleeper, AC", "Hatia-Patna Express"));
            
            options.add(createMockTrainOption("Indian Railways", "12878", 
                    "15:45", "21:20", "5h 35m", 220.0, 12, "limited", 
                    "AC Chair Car", "Ranchi-Howrah Express"));
        }
        
        // Mock taxi options
        if (request.getTransportType() == null || request.getTransportType().equals("taxi")) {
            options.add(createMockTaxiOption("Ola Cabs", "OL-789", 
                    "Immediate", "4h 30m", "4h 30m", 1200.0, 4, "available", 
                    "AC, Driver", "Direct route"));
            
            options.add(createMockTaxiOption("Uber", "UB-456", 
                    "30 min", "4h 45m", "4h 45m", 1100.0, 3, "available", 
                    "AC, WiFi", "Via scenic route"));
            
            options.add(createMockTaxiOption("Local Taxi", "LT-123", 
                    "Immediate", "4h 15m", "4h 15m", 1000.0, 2, "available", 
                    "AC", "Local driver"));
        }
        
        // Mock flight options (if applicable)
        if (request.getTransportType() == null || request.getTransportType().equals("flight")) {
            if (isLongDistance(source, destination)) {
                options.add(createMockFlightOption("IndiGo", "6E-234", 
                        "09:30", "11:45", "2h 15m", 3500.0, 8, "available", 
                        "Economy", "Direct flight"));
                
                options.add(createMockFlightOption("SpiceJet", "SG-567", 
                        "16:20", "18:35", "2h 15m", 3200.0, 5, "limited", 
                        "Economy", "Direct flight"));
            }
        }
        
        return options;
    }
    
    private TransportResponse.TransportOption createMockBusOption(String operator, String vehicleNumber, 
            String departure, String arrival, String duration, Double price, Integer seats, 
            String status, String amenities, String route) {
        TransportResponse.TransportOption option = new TransportResponse.TransportOption();
        option.setTransportType("bus");
        option.setOperator(operator);
        option.setVehicleNumber(vehicleNumber);
        option.setDepartureTime(departure);
        option.setArrivalTime(arrival);
        option.setDuration(duration);
        option.setPrice(price);
        option.setAvailableSeats(seats);
        option.setStatus(status);
        option.setAmenities(amenities);
        option.setRoute(route);
        return option;
    }
    
    private TransportResponse.TransportOption createMockTrainOption(String operator, String vehicleNumber, 
            String departure, String arrival, String duration, Double price, Integer seats, 
            String status, String amenities, String route) {
        TransportResponse.TransportOption option = new TransportResponse.TransportOption();
        option.setTransportType("train");
        option.setOperator(operator);
        option.setVehicleNumber(vehicleNumber);
        option.setDepartureTime(departure);
        option.setArrivalTime(arrival);
        option.setDuration(duration);
        option.setPrice(price);
        option.setAvailableSeats(seats);
        option.setStatus(status);
        option.setAmenities(amenities);
        option.setRoute(route);
        return option;
    }
    
    private TransportResponse.TransportOption createMockTaxiOption(String operator, String vehicleNumber, 
            String departure, String arrival, String duration, Double price, Integer seats, 
            String status, String amenities, String route) {
        TransportResponse.TransportOption option = new TransportResponse.TransportOption();
        option.setTransportType("taxi");
        option.setOperator(operator);
        option.setVehicleNumber(vehicleNumber);
        option.setDepartureTime(departure);
        option.setArrivalTime(arrival);
        option.setDuration(duration);
        option.setPrice(price);
        option.setAvailableSeats(seats);
        option.setStatus(status);
        option.setAmenities(amenities);
        option.setRoute(route);
        return option;
    }
    
    private TransportResponse.TransportOption createMockFlightOption(String operator, String vehicleNumber, 
            String departure, String arrival, String duration, Double price, Integer seats, 
            String status, String amenities, String route) {
        TransportResponse.TransportOption option = new TransportResponse.TransportOption();
        option.setTransportType("flight");
        option.setOperator(operator);
        option.setVehicleNumber(vehicleNumber);
        option.setDepartureTime(departure);
        option.setArrivalTime(arrival);
        option.setDuration(duration);
        option.setPrice(price);
        option.setAvailableSeats(seats);
        option.setStatus(status);
        option.setAmenities(amenities);
        option.setRoute(route);
        return option;
    }
    
    private boolean isLongDistance(String source, String destination) {
        // Simple logic to determine if flight is applicable
        return (source.contains("ranchi") && destination.contains("delhi")) ||
               (source.contains("ranchi") && destination.contains("mumbai")) ||
               (source.contains("ranchi") && destination.contains("bangalore")) ||
               (source.contains("jamshedpur") && destination.contains("delhi"));
    }
}

