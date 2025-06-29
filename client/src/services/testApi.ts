import apiClient from './api';

// Simple API connectivity test
export async function testApiConnection(): Promise<any | null> {
  try {
    const response = await apiClient.get('/saludo');
    console.log('API connection test successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to connect to API:', error);
    return null;
  }
}