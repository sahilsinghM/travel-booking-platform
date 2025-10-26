import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Attempting login with:', email);
      const response = await api.login(email, password);
      console.log('Login response:', response);
      
      if (response.success) {
        setUser(response.user);
        console.log('User set:', response.user);
        return { success: true, user: response.user };
      } else {
        const errorMsg = response.message || 'Login failed';
        setError(errorMsg);
        console.error('Login failed:', errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.register(userData);
      
      if (response.success) {
        setUser(response.user);
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      const errorMessage = 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAdmin,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


