// src/App.js
import { useState } from 'react';
import './App.css';

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
    setLoading(true);
    setError('');
    
    try {
      // Aquí iría la conexión con tu backend
      // const response = await fetch('/api/estimate', {...});
      // Simulación mientras desarrollas:
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Manejar la respuesta del backend aquí
    } catch (err) {
      setError('Error al conectar con el backend');
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
            {projectTypes.map((type, index) => (
              <button
                key={index}
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