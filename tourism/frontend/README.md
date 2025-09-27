# Jharkhand Tourism Platform - Frontend

A modern React frontend for the AI-powered digital tourism platform for Jharkhand, built with Reactstrap and Bootstrap.

## Features

- **AI-Powered Itinerary Planning**: Interactive form to generate personalized travel plans
- **Multilingual Chatbot Interface**: Chat interface with language support
- **Local Marketplace**: Browse and purchase local products, events, homestays, and eco-tours
- **Location Services**: Find nearby attractions and services
- **Transport Information**: Real-time transport availability
- **Feedback System**: Submit feedback with sentiment analysis
- **Analytics Dashboard**: Admin dashboard with comprehensive analytics
- **Blockchain Integration**: Secure transactions and guide verification

## Tech Stack

- **React 18** with TypeScript
- **Reactstrap 9** - Bootstrap components for React
- **Bootstrap 5** - CSS framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Hook Form** - Form handling
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout/         # Layout components (Header, Footer, Layout)
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Itinerary/      # Itinerary planning
│   ├── Chatbot/        # Chatbot interface
│   ├── Marketplace/    # Marketplace pages
│   ├── Location/       # Location services
│   ├── Transport/      # Transport information
│   ├── Feedback/       # Feedback system
│   ├── Admin/          # Admin dashboard
│   └── Blockchain/     # Blockchain services
├── services/           # API services
├── store/              # State management
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## Key Components

### Authentication
- Login/Register forms with validation
- JWT token management
- Role-based access control (TOURIST, GUIDE, ADMIN)

### Itinerary Planner
- Interactive form with budget, duration, interests
- AI-generated personalized itineraries
- Recommended places and activities

### Marketplace
- Product listings with categories
- Event management
- Homestay bookings
- Eco-tour packages

### Admin Dashboard
- Analytics and statistics
- User management
- Content moderation

## API Integration

The frontend integrates with the Spring Boot backend API:

- **Base URL**: `http://localhost:8080/api`
- **Authentication**: JWT tokens
- **Error Handling**: Centralized error handling with toast notifications

## Styling

- **Bootstrap 5** for responsive design
- **Custom CSS** for platform-specific styling
- **Reactstrap** components for consistent UI
- **Responsive design** for mobile and desktop

## State Management

- **Zustand** for global state (authentication, user data)
- **React Query** for server state management
- **Local state** with React hooks for component-specific state

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## Demo Credentials

- **Admin**: admin@jharkhandtourism.com / admin123
- **Guide**: guide@jharkhandtourism.com / guide123
- **Tourist**: tourist@jharkhandtourism.com / tourist123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
