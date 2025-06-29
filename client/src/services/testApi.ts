import apiClient from './api';

// Prueba simple de conexión a la API
export async function testApiConnection() {
  try {
    const response = await apiClient.get('/saludo');
    console.log('Respuesta de /saludo:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    return null;
  }
}
