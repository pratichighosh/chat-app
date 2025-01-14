import axios from 'axios';

const API_URL = '/api';

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token and get user info
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch {
        return null;
      }
    }
    return null;
  }
};