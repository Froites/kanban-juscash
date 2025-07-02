import { apiClient } from './api';
import { User, LoginCredentials, RegisterData, ApiResponse } from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

interface AuthResponse extends ApiResponse {
  user: User;
  token: string;
  message: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      senha: credentials.senha,
    });
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    });
    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiClient.get<{ user: User; message: string }>(API_ENDPOINTS.AUTH.PROFILE);
    return response.user;
  }
}

export const authService = new AuthService();