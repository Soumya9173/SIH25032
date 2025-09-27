import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Unauthorized from './pages/Unauthorized';
import ItineraryPlanner from './pages/Itinerary/ItineraryPlanner';
import ChatbotInterface from './pages/Chatbot';
import Marketplace from './pages/Marketplace/Marketplace';
import LocationServices from './pages/Location/LocationServices';
import TransportInfo from './pages/Transport/TransportInfo';
import FeedbackForm from './pages/Feedback/FeedbackForm';
import AnalyticsDashboard from './pages/Admin/AnalyticsDashboard';
import BlockchainServices from './pages/Blockchain/BlockchainServices';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="itinerary" element={<ItineraryPlanner />} />
              <Route path="chatbot" element={<ChatbotInterface />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="location" element={<LocationServices />} />
              <Route path="transport" element={<TransportInfo />} />
              <Route path="feedback" element={<FeedbackForm />} />
              <Route path="blockchain" element={<BlockchainServices />} />
              <Route 
                path="admin/analytics" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AnalyticsDashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

