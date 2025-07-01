import axios from 'axios';

const API = import.meta.env.VITE_API_URL_AUTH || 'http://localhost:3001/api/auth';

export async function register({ email, password, name }) {
  const res = await axios.post(`${API}/register`, { email, password, name });
  return res.data;
}

export async function login({ email, password }) {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
}
