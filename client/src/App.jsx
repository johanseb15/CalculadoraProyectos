import React from 'react';
import CalculadoraProyectos from './components/CalculadoraProyectos';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/useAuth';

const userBarStyle = { textAlign: 'right', padding: 16 };
const userNameStyle = { marginRight: 12 };
const logoutBtnStyle = {
  color: '#ef4444',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
};

function App() {
  const { user, logout, loading, error } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (e) {
      alert('Error al cerrar sesión. Intenta de nuevo.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Cargando...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: 40, color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <>
          <div style={userBarStyle}>
            <span style={userNameStyle}>Hola, {user.name || user.email}</span>
            <button onClick={handleLogout} style={logoutBtnStyle}>
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