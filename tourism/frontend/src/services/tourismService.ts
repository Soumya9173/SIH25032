import api from './api';
import {
  ItineraryRequest,
  ItineraryResponse,
  ChatRequest,
  ChatResponse,
  LocationRequest,
  LocationResponse,
  TransportRequest,
  TransportResponse,
  FeedbackRequest,
  FeedbackResponse,
  BlockchainTransactionRequest,
  BlockchainTransactionResponse,
  GuideVerificationRequest,
  GuideVerificationResponse,
  AnalyticsResponse,
  Product,
  Event,
  Homestay,
  EcoTour,
} from '../types';

export const tourismService = {
  // Itinerary Planning
  planItinerary: async (request: ItineraryRequest): Promise<ItineraryResponse> => {
    const response = await api.post<ItineraryResponse>('/itinerary/plan', request);
    return response.data;
  },

  // Chatbot
  askChatbot: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chatbot/ask', request);
    return response.data;
  },

  // Location Services
  findNearbyPlaces: async (request: LocationRequest): Promise<LocationResponse> => {
    const response = await api.post<LocationResponse>('/location/nearby', request);
    return response.data;
  },

  // Transport
  getTransportInfo: async (request: TransportRequest): Promise<TransportResponse> => {
    const response = await api.post<TransportResponse>('/transport/realtime', request);
    return response.data;
  },

  // Feedback
  submitFeedback: async (request: FeedbackRequest): Promise<FeedbackResponse> => {
    const response = await api.post<FeedbackResponse>('/feedback/submit', request);
    return response.data;
  },

  getFeedbacks: async (): Promise<FeedbackResponse[]> => {
    const response = await api.get<FeedbackResponse[]>('/feedback');
    return response.data;
  },

  getFeedbacksByCategory: async (category: string): Promise<FeedbackResponse[]> => {
    const response = await api.get<FeedbackResponse[]>(`/feedback/category/${category}`);
    return response.data;
  },

  getFeedbacksBySentiment: async (sentiment: string): Promise<FeedbackResponse[]> => {
    const response = await api.get<FeedbackResponse[]>(`/feedback/sentiment/${sentiment}`);
    return response.data;
  },

  // Blockchain
  processTransaction: async (request: BlockchainTransactionRequest): Promise<BlockchainTransactionResponse> => {
    const response = await api.post<BlockchainTransactionResponse>('/blockchain/transaction', request);
    return response.data;
  },

  verifyGuide: async (request: GuideVerificationRequest): Promise<GuideVerificationResponse> => {
    const response = await api.post<GuideVerificationResponse>('/blockchain/verifyGuide', request);
    return response.data;
  },

  // Analytics
  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const response = await api.get<AnalyticsResponse>('/admin/analytics');
    return response.data;
  },

  // Marketplace - Products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/marketplace/products');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/marketplace/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/marketplace/products/category/${category}`);
    return response.data;
  },

  getProductsByLocation: async (location: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/marketplace/products/location/${location}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/marketplace/products/search?query=${query}`);
    return response.data;
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.post<Product>('/marketplace/products', product);
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/marketplace/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/marketplace/products/${id}`);
  },

  // Marketplace - Events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/marketplace/events');
    return response.data;
  },

  getEventById: async (id: number): Promise<Event> => {
    const response = await api.get<Event>(`/marketplace/events/${id}`);
    return response.data;
  },

  getEventsByType: async (eventType: string): Promise<Event[]> => {
    const response = await api.get<Event[]>(`/marketplace/events/type/${eventType}`);
    return response.data;
  },

  getEventsByLocation: async (location: string): Promise<Event[]> => {
    const response = await api.get<Event[]>(`/marketplace/events/location/${location}`);
    return response.data;
  },

  getActiveEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/marketplace/events/active');
    return response.data;
  },

  searchEvents: async (query: string): Promise<Event[]> => {
    const response = await api.get<Event[]>(`/marketplace/events/search?query=${query}`);
    return response.data;
  },

  createEvent: async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const response = await api.post<Event>('/marketplace/events', event);
    return response.data;
  },

  updateEvent: async (id: number, event: Partial<Event>): Promise<Event> => {
    const response = await api.put<Event>(`/marketplace/events/${id}`, event);
    return response.data;
  },

  deleteEvent: async (id: number): Promise<void> => {
    await api.delete(`/marketplace/events/${id}`);
  },

  // Marketplace - Homestays
  getHomestays: async (): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>('/marketplace/homestays');
    return response.data;
  },

  getHomestayById: async (id: number): Promise<Homestay> => {
    const response = await api.get<Homestay>(`/marketplace/homestays/${id}`);
    return response.data;
  },

  getHomestaysByLocation: async (location: string): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>(`/marketplace/homestays/location/${location}`);
    return response.data;
  },

  getAvailableHomestays: async (): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>('/marketplace/homestays/available');
    return response.data;
  },

  getHomestaysByGuestCapacity: async (guests: number): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>(`/marketplace/homestays/guests/${guests}`);
    return response.data;
  },

  getHomestaysByMaxPrice: async (maxPrice: number): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>(`/marketplace/homestays/price/${maxPrice}`);
    return response.data;
  },

  searchHomestays: async (query: string): Promise<Homestay[]> => {
    const response = await api.get<Homestay[]>(`/marketplace/homestays/search?query=${query}`);
    return response.data;
  },

  createHomestay: async (homestay: Omit<Homestay, 'id' | 'createdAt' | 'updatedAt'>): Promise<Homestay> => {
    const response = await api.post<Homestay>('/marketplace/homestays', homestay);
    return response.data;
  },

  updateHomestay: async (id: number, homestay: Partial<Homestay>): Promise<Homestay> => {
    const response = await api.put<Homestay>(`/marketplace/homestays/${id}`, homestay);
    return response.data;
  },

  deleteHomestay: async (id: number): Promise<void> => {
    await api.delete(`/marketplace/homestays/${id}`);
  },

  // Marketplace - Eco Tours
  getEcoTours: async (): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>('/marketplace/ecotours');
    return response.data;
  },

  getEcoTourById: async (id: number): Promise<EcoTour> => {
    const response = await api.get<EcoTour>(`/marketplace/ecotours/${id}`);
    return response.data;
  },

  getEcoToursByType: async (tourType: string): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>(`/marketplace/ecotours/type/${tourType}`);
    return response.data;
  },

  getEcoToursByLocation: async (location: string): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>(`/marketplace/ecotours/location/${location}`);
    return response.data;
  },

  getAvailableEcoTours: async (): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>('/marketplace/ecotours/available');
    return response.data;
  },

  getEcoToursByDifficulty: async (difficultyLevel: string): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>(`/marketplace/ecotours/difficulty/${difficultyLevel}`);
    return response.data;
  },

  getEcoToursByMaxPrice: async (maxPrice: number): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>(`/marketplace/ecotours/price/${maxPrice}`);
    return response.data;
  },

  searchEcoTours: async (query: string): Promise<EcoTour[]> => {
    const response = await api.get<EcoTour[]>(`/marketplace/ecotours/search?query=${query}`);
    return response.data;
  },

  createEcoTour: async (ecoTour: Omit<EcoTour, 'id' | 'createdAt' | 'updatedAt'>): Promise<EcoTour> => {
    const response = await api.post<EcoTour>('/marketplace/ecotours', ecoTour);
    return response.data;
  },

  updateEcoTour: async (id: number, ecoTour: Partial<EcoTour>): Promise<EcoTour> => {
    const response = await api.put<EcoTour>(`/marketplace/ecotours/${id}`, ecoTour);
    return response.data;
  },

  deleteEcoTour: async (id: number): Promise<void> => {
    await api.delete(`/marketplace/ecotours/${id}`);
  },
};

