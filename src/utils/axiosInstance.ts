// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // or your backend API base URL
});

// Automatically add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or sessionStorage
    console.log("Token:", token); // Debugging line to check the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
