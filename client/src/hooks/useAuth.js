import { useState } from 'react';
import { login, register } from '../services/authApi';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to get user from localStorage:', error);
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch (error) {
      console.error('Failed to get token from localStorage:', error);
      return null;
    }
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await login(data);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', res.token);
      return true;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await register(data);
      return await handleLogin({ email: data.email, password: data.password });
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, token, error, loading, handleLogin, handleRegister, logout };
}
