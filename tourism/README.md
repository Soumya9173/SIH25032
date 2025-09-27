# Jharkhand Tourism Platform

An AI-powered digital tourism platform for Jharkhand, India, built with Spring Boot 3, featuring personalized itinerary planning, multilingual chatbot assistance, blockchain integration, and comprehensive marketplace functionality.

## Features

### 🤖 AI-Powered Features
- **Personalized Itinerary Planning**: AI-based itinerary generation based on budget, duration, and interests
- **Multilingual Chatbot**: Support for English, Hindi, and Tribal languages
- **Sentiment Analysis**: AI-driven feedback analysis for tourism insights

### 🔗 Blockchain Integration
- **Transaction Recording**: Secure blockchain-based transaction logging
- **Guide Verification**: Blockchain-verified guide certification system

### 🗺️ Location Services
- **Google Maps Integration**: Nearby places discovery based on GPS coordinates
- **Real-time Transport**: Bus, train, taxi, and flight information

### 🏪 Marketplace
- **Products**: Handicrafts, souvenirs, and local products
- **Events**: Cultural festivals, adventure activities, and workshops
- **Homestays**: Authentic local accommodation options
- **Eco Tours**: Wildlife safaris, nature treks, and adventure tours

### 📊 Analytics Dashboard
- **Tourist Statistics**: Comprehensive tourism analytics
- **Sentiment Trends**: Feedback sentiment analysis over time
- **Revenue Tracking**: Booking and revenue analytics

## Technology Stack

- **Backend**: Spring Boot 3.2.0, Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **API Documentation**: Spring Boot Actuator

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Setup Instructions

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE tourismdb;
```

Update `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tourismdb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Build and Run

```bash
# Clone the repository
git clone <repository-url>
cd tourism

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start at `http://localhost:8080`

### 3. Sample Data

The application automatically loads sample data including:
- Admin, Guide, and Tourist users
- Sample products (handicrafts, jewelry)
- Sample events (cultural festivals, workshops)
- Sample homestays and eco tours

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Features
- `POST /api/itinerary/plan` - AI-powered itinerary planning
- `POST /api/chatbot/ask` - Multilingual chatbot assistance
- `POST /api/feedback/submit` - Submit feedback with sentiment analysis

### Location & Transport
- `POST /api/location/nearby` - Find nearby places
- `POST /api/transport/realtime` - Real-time transport information

### Blockchain
- `POST /api/blockchain/transaction` - Process blockchain transaction
- `POST /api/blockchain/verifyGuide` - Verify guide credentials

### Marketplace (Public Access)
- `GET /api/marketplace/products` - Get all products
- `GET /api/marketplace/products/{id}` - Get product by ID
- `GET /api/marketplace/events` - Get all events
- `GET /api/marketplace/homestays` - Get all homestays
- `GET /api/marketplace/ecotours` - Get all eco tours

### Marketplace Management (Admin/Guide Access)
- `POST /api/marketplace/products` - Create product
- `PUT /api/marketplace/products/{id}` - Update product
- `DELETE /api/marketplace/products/{id}` - Delete product

### Analytics (Admin Only)
- `GET /api/admin/analytics` - Get analytics dashboard

## Sample API Requests

### 1. User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "9876543210",
    "role": "TOURIST"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. AI Itinerary Planning
```bash
curl -X POST http://localhost:8080/api/itinerary/plan \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 10000,
    "durationDays": 5,
    "interests": ["adventure", "culture", "nature"],
    "preferredLocation": "Ranchi",
    "accommodationType": "mid-range",
    "transportPreference": "mixed"
  }'
```

### 4. Chatbot Query
```bash
curl -X POST http://localhost:8080/api/chatbot/ask \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the best places to visit in Jharkhand?",
    "language": "en",
    "context": "tourism"
  }'
```

### 5. Find Nearby Places
```bash
curl -X POST http://localhost:8080/api/location/nearby \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 23.3441,
    "longitude": 85.3096,
    "radius": 10.0,
    "category": "tourist_attractions"
  }'
```

### 6. Submit Feedback
```bash
curl -X POST http://localhost:8080/api/feedback/submit \
  -H "Content-Type: application/json" \
  -d '{
    "feedbackText": "Amazing experience! The homestay was comfortable and the guide was very knowledgeable.",
    "rating": 5,
    "category": "accommodation",
    "entityId": 1,
    "entityType": "Homestay"
  }'
```

## Default Users

The application creates default users for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@jharkhandtourism.com | admin123 |
| Guide | guide@jharkhandtourism.com | guide123 |
| Tourist | tourist@jharkhandtourism.com | tourist123 |

## Security

- JWT-based authentication
- Role-based access control (TOURIST, GUIDE, ADMIN)
- Password encryption using BCrypt
- Protected endpoints with appropriate authorization

## Future Integrations

The application includes placeholders for future integrations:

- **Gemini API**: For real AI-powered responses
- **Google Maps API**: For actual location data
- **Blockchain Networks**: Ethereum/Polygon integration
- **Sentiment Analysis APIs**: Google Cloud Natural Language, AWS Comprehend
- **Transport APIs**: IRCTC, state transport APIs

## Development Notes

- All AI features currently use mock implementations
- Blockchain integration returns mock transaction hashes
- Location services use mock data for Jharkhand places
- Transport information is simulated
- Sentiment analysis uses keyword-based approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

