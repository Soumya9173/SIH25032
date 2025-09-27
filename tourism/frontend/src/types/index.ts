// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'TOURIST' | 'GUIDE' | 'ADMIN';
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'TOURIST' | 'GUIDE' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  role: 'TOURIST' | 'GUIDE' | 'ADMIN';
}

// Itinerary Types
export interface ItineraryRequest {
  budget: number;
  durationDays: number;
  interests: string[];
  preferredLocation?: string;
  accommodationType?: string;
  transportPreference?: string;
}

export interface ItineraryResponse {
  itineraryId: number;
  generatedPlan: string;
  estimatedCost: number;
  durationDays: number;
  recommendedPlaces: string[];
  recommendedActivities: string[];
  accommodationSuggestions: string;
  transportSuggestions: string;
  tips: string;
}

// Chatbot Types
export interface ChatRequest {
  message: string;
  language?: string;
  context?: string;
}

export interface ChatResponse {
  response: string;
  language: string;
  suggestions: string[];
  context: string;
  isMultilingual: boolean;
}

// Location Types
export interface LocationRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  category?: string;
  language?: string;
}

export interface NearbyPlace {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  description: string;
  phoneNumber: string;
  rating: number;
  imageUrl: string;
  openingHours: string;
}

export interface LocationResponse {
  nearbyPlaces: NearbyPlace[];
  status: string;
  message: string;
  userLatitude: number;
  userLongitude: number;
  searchRadius: number;
}

// Transport Types
export interface TransportRequest {
  source: string;
  destination: string;
  transportType?: string;
  date?: string;
  time?: string;
  passengers?: number;
}

export interface TransportOption {
  transportType: string;
  operator: string;
  vehicleNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  status: string;
  amenities: string;
  route: string;
}

export interface TransportResponse {
  options: TransportOption[];
  status: string;
  message: string;
  source: string;
  destination: string;
}

// Marketplace Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  isAvailable: boolean;
  sellerName: string;
  sellerContact: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
  latitude: number;
  longitude: number;
  ticketPrice: number;
  maxAttendees: number;
  currentAttendees: number;
  organizerName: string;
  organizerContact: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Homestay {
  id: number;
  name: string;
  description: string;
  ownerName: string;
  ownerContact: string;
  address: string;
  location: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  maxGuests: number;
  amenities: string;
  roomType: string;
  imageUrls: string;
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EcoTour {
  id: number;
  name: string;
  description: string;
  tourType: string;
  durationHours: number;
  difficultyLevel: string;
  maxParticipants: number;
  currentParticipants: number;
  pricePerPerson: number;
  guideName: string;
  guideContact: string;
  guideLicense: string;
  meetingPoint: string;
  location: string;
  latitude: number;
  longitude: number;
  includes: string;
  excludes: string;
  imageUrls: string;
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Feedback Types
export interface FeedbackRequest {
  feedbackText: string;
  rating: number;
  category?: string;
  entityId?: number;
  entityType?: string;
}

export interface FeedbackResponse {
  feedbackId: number;
  feedbackText: string;
  rating: number;
  category: string;
  entityId: number;
  entityType: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  sentimentScore: number;
  message: string;
  isVerified: boolean;
}

// Blockchain Types
export interface BlockchainTransactionRequest {
  transactionType: string;
  amount: number;
  description?: string;
  entityId?: string;
  entityType?: string;
  guideId?: string;
  guideLicense?: string;
}

export interface BlockchainTransactionResponse {
  transactionId: string;
  blockchainTxId: string;
  status: string;
  message: string;
  timestamp: number;
  blockHash: string;
  confirmations: number;
}

export interface GuideVerificationRequest {
  guideId: string;
  guideLicense: string;
  guideName?: string;
  contactNumber?: string;
  specialization?: string;
}

export interface GuideVerificationResponse {
  verificationId: string;
  guideId: string;
  blockchainTxId: string;
  isVerified: boolean;
  verificationStatus: string;
  message: string;
  timestamp: number;
  certificateHash?: string;
}

// Analytics Types
export interface DashboardStats {
  totalTourists: number;
  totalBookings: number;
  totalFeedback: number;
  averageRating: number;
  activeUsers: number;
  totalRevenue: number;
}

export interface SentimentTrend {
  date: string;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  averageSentimentScore: number;
}

export interface PopularDestination {
  location: string;
  visitCount: number;
  averageRating: number;
  totalBookings: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookingCount: number;
  category: string;
}

export interface AnalyticsResponse {
  dashboardStats: DashboardStats;
  sentimentTrends: SentimentTrend[];
  popularDestinations: PopularDestination[];
  revenueData: RevenueData[];
  userStats: Record<string, number>;
  bookingStats: Record<string, number>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

