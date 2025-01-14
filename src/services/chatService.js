// src/services/chatService.js
import axios from 'axios';

const API_URL = '/api';

export const chatService = {
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  getMessages: async (userId) => {
    const response = await axios.get(`${API_URL}/messages/${userId}`);
    return response.data;
  },

  sendMessage: async (recipientId, content) => {
    const response = await axios.post(`${API_URL}/messages`, {
      recipientId,
      content
    });
    return response.data;
  }
};
