import axios from 'axios';

export async function downloadEstimatePDF({ estimateId, token }) {
function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.replace('/api/estimate', '') ||
         (import.meta.env.MODE === 'production'
           ? 'https://api.tudominio.com'
           : 'http://localhost:3001');
}

export async function downloadEstimatePDF({ estimateId, token }) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/pdf/estimate/${estimateId}`;

  // …rest of the implementation…
}  if (!estimateId || !token) {
    throw new Error('estimateId and token are required');
  }

  try {
    const url = `/api/pdf/estimate/${estimateId}`;
    const res = await axios.post(url, {}, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure we got a non-empty PDF
    if (res.data.size === 0) {
      throw new Error('Received empty PDF file');
    }

    // Descargar el PDF
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'estimacion-proyecto.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Clean up the blob URL to prevent memory leaks
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 404) {
      throw new Error('Estimate not found or access denied.');
    } else if (error.response) {
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to download PDF');
    } else {
      throw error;
    }
  }
}