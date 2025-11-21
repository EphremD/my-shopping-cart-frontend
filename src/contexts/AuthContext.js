import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // DIRECT URL - No environment variables
  const PRODUCTION_API_URL = 'https://my-shopping-cart-backend-production.up.railway.app';

  useEffect(() => {
    console.log('🚀 Using Production API URL:', PRODUCTION_API_URL);
    
    // Set the base URL for ALL axios requests - INCLUDING /api PREFIX
    axios.defaults.baseURL = PRODUCTION_API_URL + '/api';
    
    // Test the connection immediately
    axios.get('/products')
      .then(response => {
        console.log('✅ Backend connection successful! Products loaded:', response.data.data.length);
      })
      .catch(error => {
        console.error('❌ Backend connection failed:', error.message);
        console.log('💡 Check if backend is running at:', PRODUCTION_API_URL);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};