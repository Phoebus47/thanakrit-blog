import axios from "axios";
import type { JWTInterceptorsInterface } from "../types";

class JWTInterceptors implements JWTInterceptorsInterface {
  private isSetup: boolean = false;
  private onUnauthorizedCallback: (() => void) | null = null;

  // Setup axios configuration
  setup(onUnauthorized?: () => void): void {
    if (this.isSetup) return;

    // Store callback for later use
    this.onUnauthorizedCallback = onUnauthorized || null;

    // Set base URL
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

    // Request interceptor - add token to all requests
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          this.clearToken();
          
          // Call callback function if provided
          if (this.onUnauthorizedCallback && typeof this.onUnauthorizedCallback === 'function') {
            this.onUnauthorizedCallback();
          }
        }
        return Promise.reject(error);
      }
    );

    this.isSetup = true;
  }

  // Set unauthorized callback (can be called from AuthProvider)
  setUnauthorizedCallback(callback: () => void): void {
    this.onUnauthorizedCallback = callback;
  }

  // Set token in localStorage and update default headers
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear token from localStorage and axios headers
  clearToken(): void {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Reset interceptors (useful for testing)
  reset(): void {
    axios.interceptors.request.clear();
    axios.interceptors.response.clear();
    this.isSetup = false;
    this.onUnauthorizedCallback = null;
  }
}

// Export singleton instance
export default new JWTInterceptors();
