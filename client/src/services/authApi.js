import axios from 'axios';

const API = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001/api/auth';

/**
 * Registers a new user.
 * @param {Object} params - The registration parameters.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @param {string} params.name - The user's name.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the request fails, an error is thrown and must be handled by the caller.
 */
export async function register({ email, password, name }) {
  const res = await axios.post(`${API}/register`, { email, password, name });
  return res.data;
}

/**
 * Logs in a user.
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the request fails, an error is thrown and must be handled by the caller.
 */
export async function login({ email, password }) {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
}
