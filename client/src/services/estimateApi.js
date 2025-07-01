import axios from 'axios';

// Devuelve la URL de la API según entorno
function getApiUrl() {
  let url = import.meta.env.VITE_API_URL;
  if (!url) {
    if (import.meta.env.MODE === 'production') {
      url = 'https://api.tudominio.com/api/estimate';
    } else if (import.meta.env.MODE === 'staging') {
      url = 'https://staging-api.tudominio.com/api/estimate';
    } else {
      url = 'http://localhost:3001/api/estimate';
    }
  }
  return url;
}

export async function estimateProject(data) {
  const url = getApiUrl();
  const response = await axios.post(url, data);
  return response.data;
}
