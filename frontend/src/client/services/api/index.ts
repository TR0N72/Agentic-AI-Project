import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api_gateway:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for handling JWT tokens here

export default apiClient;
