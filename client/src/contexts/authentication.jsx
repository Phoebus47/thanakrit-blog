/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  // Login user
  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`, // แก้จาก hardcoded URL
        data
      );

      const responseData = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', responseData.token);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      await fetchUser();
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
      return { error: error.message };
    }
  };

  // Register user
  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`, // แก้จาก hardcoded URL
        data
      );

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
      return { error: error.message };
    }
  };

  // Fetch user details using Backend API
  const fetchUser = async () => {
    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/get-user` // แก้จาก hardcoded URL
      );

      const userData = response.data;
      
      setState((prevState) => ({
        ...prevState,
        user: userData,
        getUserLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        user: null,
        getUserLoading: false,
      }));
      localStorage.removeItem('authToken');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout user
  const logout = async () => {
    localStorage.removeItem('authToken');
    setState({ user: null, error: null, loading: null });
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
