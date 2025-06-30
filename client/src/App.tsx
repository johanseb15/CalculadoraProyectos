// src/App.js
import { useState } from 'react';
import './App.css';
import './styles/main.css';
import api from './services/api.ts';

function App() {
  const [projectType, setProjectType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    "Sitio web básico",
    "E-commerce",
    "Aplicación web",
    "Landing page",
    "Rediseño web"
  ];

const handleCalculate = async () => {
  if (!projectType.trim()) {
    setError('Por favor selecciona un tipo de proyecto');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const response = await api.post('/estimate', {
      projectType,
      timestamp: new Date().toISOString()
    });

    console.log('Estimation result:', response.data);
    // Handle successful response - maybe navigate to results or update state
  } catch (err) {
    if (err.response?.status === 400) {
      setError('Datos de proyecto inválidos');
    } else if (err.response?.status >= 500) {
      setError('Error del servidor. Intenta nuevamente.');
    } else {
      setError(err instanceof Error ? err.message : 'Error al conectar con el backend');
    }
    console.error('Estimation error:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">
      <header>
        <h1>Web Agency Estimator</h1>
        <h2>Estimador de costos inteligente para agencias web con IA avanzada</h2>
      </header>

      <main>
        <section className="project-selection">
          <h3>¿Qué tipo de proyecto necesitas?</h3>
          
          <div className="project-types">
            {projectTypes.map((type) => (
              <button
                key={type}
                className={`type-btn ${projectType === type ? 'selected' : ''}`}
                onClick={() => setProjectType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {error && <div className="error-message">{error}</div>}

        <button 
          className="calculate-btn"
          onClick={handleCalculate}
          disabled={!projectType || loading}
        >
          {loading ? 'Calculando...' : 'Calcular estimación'}
        </button>
      </main>

      <footer>
        <p>CalculadoraProyectos © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;