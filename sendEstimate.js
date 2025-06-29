import apiClient from '../client/src/services/api';

export async function sendEstimateToBackend(estimate, projectData, teamData) {
  try {
    const response = await apiClient.post('/estimate', {
      estimate,
      projectData,
      teamData
    });
    return response.data;
  } catch (error) {
    console.error('Error enviando estimación al backend:', error);
    return null;
  }
}
