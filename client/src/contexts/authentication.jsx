/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // Fetch user details using Backend API
  const fetchUser = async () => {
    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setState((prevState) => ({
          ...prevState,
          user: null,
          getUserLoading: false,
        }));
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        localStorage.removeItem('authToken');
        throw new Error('Invalid token');
      }

      const userData = await response.json();
      
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

  // Login user
  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('authToken', responseData.token);

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/");
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
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/sign-up/success");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
      return { error: error.message };
    }
  };

  // Logout user
  const logout = async () => {
    localStorage.removeItem('authToken');
    setState({ user: null, error: null, loading: null });
    navigate("/");
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
