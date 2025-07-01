import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, ArrowRight, Download, Eye, Users, TrendingUp, Zap, Shield, Clock, Star, Menu, X, ChevronDown, Check, Plus, Minus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Tooltip from '../ui/Tooltip';
import { theme } from '../ui/theme';
import ErrorAlert from '../ui/ErrorAlert';
import SuccessAlert from '../ui/SuccessAlert';
import { estimateProject } from '../services/estimateApi';
import { downloadEstimatePDF } from '../services/pdfApi';
import { useAuth } from '../hooks/useAuth';
import EstimateBreakdownChart from './EstimateBreakdownChart';
import jsPDF from 'jspdf';

const CalculadoraProyectos = () => {
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    complexity: 'medium',
    features: [],
    timeline: '4-6',
    budget: '',
    clientName: '',
    email: '',
    pages: 1,
    integrations: []
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const projectTypes = [
    { value: 'landing', label: 'Landing Page' },
    { value: 'website', label: 'Sitio Web' },
    { value: 'app', label: 'Aplicación' }
  ];

  const features = [
    { value: 'contactForm', label: 'Formulario de Contacto' },
    { value: 'analytics', label: 'Analítica' },
    { value: 'seo', label: 'SEO' },
    { value: 'socialMedia', label: 'Redes Sociales' }
  ];

  const complexityMultipliers = {
    low: 1,
    medium: 1.5,
    high: 2
  };

  // INTEGRACIÓN BACKEND
  const calculateEstimate = async () => {
    setIsCalculating(true);
    setError(null);
    try {
      const data = await estimateProject({
        projectType: formData.projectType,
        features: formData.features,
        complexity: formData.complexity,
        pages: formData.pages || 1,
        integrations: formData.integrations || []
      });
      setEstimatedCost({
        total: data.totalPrice,
        breakdown: {
          base: data.basePrice,
          features: data.featuresPrice,
          complexity: data.complexityMultiplier,
          timeline: data.estimatedWeeks // o el campo adecuado
        }
      });
      setShowResults(true);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Error inesperado');
    } finally {
      setIsCalculating(false);
    }
  };

  // Persistencia local de la estimación
  useEffect(() => {
    const saved = localStorage.getItem('lastEstimate');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEstimatedCost(parsed.estimatedCost);
        setShowResults(parsed.showResults);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (estimatedCost && showResults) {
      localStorage.setItem('lastEstimate', JSON.stringify({ estimatedCost, showResults }));
    }
  }, [estimatedCost, showResults]);

  // Descargar PDF profesional desde backend
  const handleDownloadPDFBackend = async () => {
    if (!estimatedCost || !estimatedCost._id || !token) return;
    try {
      await downloadEstimatePDF({ estimateId: estimatedCost._id, token });
    } catch (e) {
      setError('No se pudo descargar el PDF profesional.');
    }
  };

  return (
    <div className="calculadora-proyectos-container" style={{maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32}}>
      <h1 style={{textAlign: 'center', fontWeight: 700, fontSize: 32, marginBottom: 24}}>Calculadora de Proyectos</h1>
      <form onSubmit={e => { e.preventDefault(); calculateEstimate(); }}>
        {/* Tipo de proyecto */}
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 500}}>Tipo de proyecto</label>
          <select
            value={formData.projectType}
            onChange={e => setFormData(f => ({...f, projectType: e.target.value}))}
            required
            style={{width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginTop: 4}}
          >
            <option value="">Selecciona una opción</option>
            {projectTypes.map(pt => (
              <option key={pt.value} value={pt.value}>{pt.label}</option>
            ))}
          </select>
        </div>
        {/* Complejidad */}
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 500}}>Complejidad</label>
          <select
            value={formData.complexity}
            onChange={e => setFormData(f => ({...f, complexity: e.target.value}))}
            required
            style={{width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginTop: 4}}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        {/* Características */}
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 500}}>Características</label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4}}>
            {features.map(f => (
              <label key={f.value} style={{display: 'flex', alignItems: 'center', gap: 4, background: '#f3f4f6', borderRadius: 8, padding: '4px 10px'}}>
                <input
                  type="checkbox"
                  checked={formData.features.includes(f.value)}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      features: e.target.checked
                        ? [...prev.features, f.value]
                        : prev.features.filter(val => val !== f.value)
                    }));
                  }}
                />
                {f.label}
              </label>
            ))}
          </div>
        </div>
        {/* Número de páginas */}
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 500}}>Número de páginas</label>
          <input
            type="number"
            min={1}
            value={formData.pages}
            onChange={e => setFormData(f => ({...f, pages: Math.max(1, Number(e.target.value))}))}
            style={{width: 80, marginLeft: 8, borderRadius: 8, border: '1px solid #ddd', padding: 6}}
          />
        </div>
        {/* Integraciones */}
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 500}}>Integraciones (opcional)</label>
          <input
            type="text"
            placeholder="Ej: Stripe, Google Maps, etc. (separadas por coma)"
            value={formData.integrations.join(', ')}
            onChange={e => setFormData(f => ({...f, integrations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)}))}
            style={{width: '100%', borderRadius: 8, border: '1px solid #ddd', padding: 8, marginTop: 4}}
          />
        </div>
        {/* Botón calcular */}
        <Button type="submit" disabled={isCalculating} style={{width: '100%', marginTop: 16, fontWeight: 600, fontSize: 18}}>
          {isCalculating ? 'Calculando...' : 'Calcular estimación'}
        </Button>
      </form>
      {/* Error */}
      {error && (
        <ErrorAlert>{error}</ErrorAlert>
      )}
      {/* Resultados */}
      {showResults && estimatedCost && (
        <>
          <SuccessAlert>¡Estimación generada con éxito!</SuccessAlert>
          <div className="results" style={{marginTop: 32, background: '#f3f4f6', borderRadius: 12, padding: 24}}>
            <h2 style={{fontWeight: 700, fontSize: 24, marginBottom: 12}}>Estimación de Costos</h2>
            <p style={{fontSize: 20, fontWeight: 600}}>Costo Total: ${estimatedCost.total}</p>
            <EstimateBreakdownChart breakdown={estimatedCost.breakdown} />
            <div style={{marginTop: 16}}>
              <h3 style={{fontWeight: 600, fontSize: 18}}>Desglose:</h3>
              <p>Base: ${estimatedCost.breakdown.base}</p>
              <p>Características: ${estimatedCost.breakdown.features}</p>
              <p>Complejidad: {estimatedCost.breakdown.complexity}</p>
              <p>Tiempo estimado: {estimatedCost.breakdown.timeline} semanas</p>
            </div>
            <button onClick={handleDownloadPDFBackend} style={{marginTop: 12, width: '100%', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer'}}>
              Descargar PDF profesional
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CalculadoraProyectos;
