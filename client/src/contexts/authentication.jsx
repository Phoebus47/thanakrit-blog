/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtInterceptors from "../utils/jwtInterceptors";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
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
  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post('/auth/login', data);

      const responseData = response.data;

      // Store token using jwtInterceptors
      jwtInterceptors.setToken(responseData.token);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      await fetchUser();
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { error: errorMessage };
    }
  };

  // Register user
  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post('/auth/register', data);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { error: errorMessage };
    }
  };

  // Fetch user details using Backend API
  const fetchUser = async () => {
    const token = jwtInterceptors.getToken();
    if (!token) {
      setState((prevState) => ({ ...prevState, getUserLoading: false }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      
      const response = await axios.get('/auth/get-user');
      const userData = response.data;
      
      setState((prevState) => ({
        ...prevState,
        user: userData,
        getUserLoading: false,
        error: null
      }));
    } catch (error) {
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
  const logout = async () => {
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
      {props.children}
    </AuthContext.Provider>
  );
}

// Hook for consuming AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
