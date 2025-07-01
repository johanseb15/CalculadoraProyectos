import React from 'react';
import CalculadoraProyectos from './components/CalculadoraProyectos';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, logout } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <div style={{ textAlign: 'right', padding: 16 }}>
            <span style={{ marginRight: 12 }}>Hola, {user.name || user.email}</span>
            <button
              onClick={logout}
              style={{
                color: '#ef4444',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Cerrar sesión
            </button>
          </div>
          <CalculadoraProyectos />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;