import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, ArrowRight, Download, Eye, Users, TrendingUp, Zap, Shield, Clock, Star, Menu, X, ChevronDown, Check, Plus, Minus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Tooltip from '../ui/Tooltip';
import { theme } from '../ui/theme';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/estimate';

const CalculadoraProyectos = () => {
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
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: formData.projectType,
          features: formData.features,
          complexity: formData.complexity,
          pages: formData.pages || 1,
          integrations: formData.integrations || []
        })
      });
      if (!res.ok) throw new Error('Error al calcular la estimación');
      const data = await res.json();
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
      setError(e.message || 'Error inesperado');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div>
      {/* ...existing JSX code... */}
      <Button onClick={calculateEstimate} disabled={isCalculating}>
        {isCalculating ? 'Calculando...' : 'Calcular estimación'}
      </Button>
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#b91c1c',
          border: '1px solid #fca5a5',
          borderRadius: 8,
          padding: '1rem',
          margin: '1rem 0',
          fontWeight: 500,
          textAlign: 'center',
          boxShadow: '0 2px 8px 0 #fca5a555'
        }}>
          <span style={{marginRight: 8}}>⚠️</span>{error}
        </div>
      )}
      {showResults && estimatedCost && (
        <div className="results">
          <h2>Estimación de Costos</h2>
          <p>Costo Total: ${estimatedCost.total}</p>
          <div>
            <h3>Desglose:</h3>
            <p>Base: ${estimatedCost.breakdown.base}</p>
            <p>Características: ${estimatedCost.breakdown.features}</p>
            <p>Complejidad: ${estimatedCost.breakdown.complexity}</p>
            <p>Tiempo estimado: {estimatedCost.breakdown.timeline} semanas</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraProyectos;
