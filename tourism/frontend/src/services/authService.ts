import api from './api';
import { AuthRequest, RegisterRequest, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    // Clear local storage and redirect
    localStorage.removeItem('auth-storage');
    window.location.href = '/login';
  },
};

