import axios from 'axios';

// const BACKEND_URL = process.env.NODE_ENV === 'development' 
//   ? 'http://localhost:8080' 
//   : 'https://fyers-backend.onrender.com';
  

const api = axios.create({
  baseURL: 'https://fyers-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Customize error handling based on status codes
    console.error('API error', error);
    return Promise.reject(error);
  }
);

export default api;
