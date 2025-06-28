import axios from 'axios';

// Consider using httpOnly cookies or secure storage instead of localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  // Validate token format (JWT typically has 3 parts)
  if (token && token.split('.').length === 3) {
    return token;
  }
  return null;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token expiry handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiry - clear token and redirect to login
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;