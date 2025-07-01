import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ErrorAlert from '../ui/ErrorAlert';
import Button from '../ui/Button';

export default function AuthForm() {
  const { handleLogin, handleRegister, error, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin({ email: form.email, password: form.password });
    } else {
      await handleRegister(form);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32 }}>
      <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
        {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
      </h2>
      <form onSubmit={onSubmit} noValidate>
        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              minLength={2}
              aria-required="true"
              aria-invalid={form.name.length > 0 && form.name.length < 2}
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginTop: 4 }}
            />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            aria-required="true"
            aria-invalid={form.email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)}
            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            minLength={6}
            aria-required="true"
            aria-invalid={form.password.length > 0 && form.password.length < 6}
            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginTop: 4 }}
          />
        </div>
        <Button type="submit" disabled={loading} style={{ width: '100%', fontWeight: 600, fontSize: 18 }}>
          {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button type="button" onClick={() => setIsLogin(l => !l)} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
      {error && <ErrorAlert>{error}</ErrorAlert>}
    </div>
  );
}
