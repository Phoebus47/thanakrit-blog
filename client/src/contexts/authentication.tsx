/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import jwtInterceptors from "../utils/jwtInterceptors";
import type { 
  AuthState, 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  ApiResponse 
} from "../types";

interface AuthContextType {
  state: AuthState;
  login: (data: LoginCredentials) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  register: (data: RegisterCredentials) => Promise<ApiResponse>;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  // Set unauthorized callback
  useEffect(() => {
    const handleUnauthorized = () => {
      setState({ user: null, error: null, loading: null, getUserLoading: null });
    };
    
    jwtInterceptors.setUnauthorizedCallback(handleUnauthorized);
  }, []);

  // Login user
  const login = async (data: LoginCredentials): Promise<ApiResponse> => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post('/auth/login', data);

      const responseData = response.data;

      // Store token using jwtInterceptors
      jwtInterceptors.setToken(responseData.token);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      await fetchUser();
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  // Register user
  const register = async (data: RegisterCredentials): Promise<ApiResponse> => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post('/auth/register', data);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  // Fetch user details using Backend API
  const fetchUser = async (): Promise<void> => {
    const token = jwtInterceptors.getToken();
    if (!token) {
      setState((prevState) => ({ ...prevState, getUserLoading: false }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      
      const response = await axios.get('/auth/get-user');
      const userData: User = response.data;
      
      setState((prevState) => ({
        ...prevState,
        user: userData,
        getUserLoading: false,
        error: null
      }));
    } catch (error: any) {
      console.error('Fetch user error:', error);
      setState((prevState) => ({
        ...prevState,
        error: null,
        user: null,
        getUserLoading: false,
      }));
      jwtInterceptors.clearToken();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout user
  const logout = async (): Promise<void> => {
    jwtInterceptors.clearToken();
    setState({ user: null, error: null, loading: null, getUserLoading: null });
  };

  const isAuthenticated = Boolean(state.user);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
