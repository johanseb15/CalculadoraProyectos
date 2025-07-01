import axios from 'axios';

// Devuelve la URL de la API según entorno usando variables de entorno
function getApiUrl() {
  let url = import.meta.env.VITE_API_URL;
  if (!url) {
    if (import.meta.env.MODE === 'production') {
      url = import.meta.env.VITE_API_URL_PROD;
    } else if (import.meta.env.MODE === 'staging') {
      url = import.meta.env.VITE_API_URL_STAGING;
    } else {
      url = import.meta.env.VITE_API_URL_DEV;
    }
  }
  return url;
}

export async function estimateProject(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data parameter: expected non-null object');
  }

  try {
    const url = getApiUrl();
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      // Network error
      throw new Error('Network error: Unable to reach the server');
    } else {
      // Other error
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}