import { useState } from 'react';

const WebAgencyEstimator = () => {
  const [formData, setFormData] = useState({
    tipoProyecto: '',
    complejidad: '',
    funcionalidades: [],
    tiempoEntrega: '',
    presupuestoReferencia: ''
  });
  
  const [estimacion, setEstimacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tiposProyecto = [
    { value: 'landing', label: 'Landing Page' },
    { value: 'corporativa', label: 'Web Corporativa' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'webapp', label: 'Aplicación Web' },
    { value: 'blog', label: 'Blog/CMS' }
  ];

  const nivelesComplejidad = [
    { value: 'basica', label: 'Básica' },
    { value: 'intermedia', label: 'Intermedia' },
    { value: 'avanzada', label: 'Avanzada' },
    { value: 'compleja', label: 'Compleja' }
  ];

  const funcionalidadesDisponibles = [
    'responsive_design',
    'cms',
    'ecommerce',
    'multiidioma',
    'seo_avanzado',
    'integraciones_apis',
    'panel_admin',
    'chat_soporte',
    'analytics',
    'seguridad_avanzada'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFuncionalidadChange = (funcionalidad) => {
    setFormData(prev => ({
      ...prev,
      funcionalidades: prev.funcionalidades.includes(funcionalidad)
        ? prev.funcionalidades.filter(f => f !== funcionalidad)
        : [...prev.funcionalidades, funcionalidad]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/estimar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setEstimacion(data);
    } catch (err) {
      setError('Error al obtener la estimación: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tipo de Proyecto:
          </label>
          <select
            name="tipoProyecto"
            value={formData.tipoProyecto}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Seleccionar...</option>
            {tiposProyecto.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nivel de Complejidad:
          </label>
          <select
            name="complejidad"
            value={formData.complejidad}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Seleccionar...</option>
            {nivelesComplejidad.map(nivel => (
              <option key={nivel.value} value={nivel.value}>
                {nivel.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Funcionalidades Adicionales:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {funcionalidadesDisponibles.map(func => (
              <label key={func} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={formData.funcionalidades.includes(func)}
                  onChange={() => handleFuncionalidadChange(func)}
                  style={{ marginRight: '8px' }}
                />
                {func.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tiempo de Entrega Deseado:
          </label>
          <select
            name="tiempoEntrega"
            value={formData.tiempoEntrega}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Seleccionar...</option>
            <option value="1-2 semanas">1-2 semanas</option>
            <option value="3-4 semanas">3-4 semanas</option>
            <option value="1-2 meses">1-2 meses</option>
            <option value="3+ meses">3+ meses</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Presupuesto de Referencia (ARS):
          </label>
          <input
            type="number"
            name="presupuestoReferencia"
            value={formData.presupuestoReferencia}
            onChange={handleInputChange}
            placeholder="Ingrese su presupuesto aproximado"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Calculando...' : 'Obtener Estimación'}
        </button>
      </form>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {estimacion && (
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          color: '#155724',
          padding: '20px',
          borderRadius: '4px'
        }}>
          <h3>Estimación del Proyecto</h3>
          <div style={{ marginBottom: '15px' }}>
            <strong>Costo Estimado:</strong> {formatCurrency(estimacion.costoTotal)}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Tiempo de Desarrollo:</strong> {estimacion.tiempoDesarrollo}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Horas Totales:</strong> {estimacion.horasTotales}h
          </div>
          
          {estimacion.desglose && (
            <div style={{ marginTop: '20px' }}>
              <h4>Desglose de Costos:</h4>
              <ul>
                <li>Diseño: {formatCurrency(estimacion.desglose.diseno)}</li>
                <li>Desarrollo: {formatCurrency(estimacion.desglose.desarrollo)}</li>
                <li>Testing: {formatCurrency(estimacion.desglose.testing)}</li>
                <li>Gestión de Proyecto: {formatCurrency(estimacion.desglose.gestionProyecto)}</li>
              </ul>
            </div>
          )}

          {estimacion.recomendaciones && estimacion.recomendaciones.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Recomendaciones:</h4>
              <ul>
                {estimacion.recomendaciones.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebAgencyEstimator;