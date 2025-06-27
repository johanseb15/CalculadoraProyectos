import { useState, useEffect } from 'react';
import { Calculator, Code, Globe, Zap, CheckCircle, DollarSign, Clock, Users, Sparkles, ArrowRight, TrendingUp, Rocket } from 'lucide-react';
import '../styles/fadeIn.css';
import '../styles/WebAgencyEstimator.css'; // Ruta relativa desde el componente
import '../styles/animations.css';
import '../styles/main.css';
interface ProjectType {
  value: string;
  label: string;
  icon: React.ComponentType;
  description: string;
  color: string;
}

interface ComplexityLevel {
  value: string;
  label: string;
  multiplier: number;
  description: string;
}

interface Feature {
  id: string;
  label: string;
  icon: string;
}

interface FormState {
  tipoProyecto: string;
  complejidad: string;
  funcionalidades: string[];
  tiempoEntrega: string;
  presupuestoReferencia: string;
}

interface Estimacion {
  costoTotal: number;
  tiempoDesarrollo: string;
  horasTotales: number;
  desglose?: {
    diseno: number;
    desarrollo: number;
    testing: number;
    gestionProyecto: number;
  };
  recomendaciones?: string[];
}

const WebAgencyEstimator = () => {
  const [formData, setFormData] = useState<FormState>({
    tipoProyecto: '',
    complejidad: '',
    funcionalidades: [],
    tiempoEntrega: '',
    presupuestoReferencia: ''
  });

  const [estimacion, setEstimacion] = useState<Estimacion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tiposProyecto = [
    { value: 'landing', label: 'Landing Page', icon: Globe, description: 'Página de aterrizaje optimizada', color: 'from-blue-400 to-cyan-400' },
    { value: 'corporativa', label: 'Web Corporativa', icon: Users, description: 'Sitio web empresarial completo', color: 'from-purple-400 to-indigo-400' },
    { value: 'ecommerce', label: 'E-commerce', icon: DollarSign, description: 'Tienda online profesional', color: 'from-green-400 to-emerald-400' },
    { value: 'webapp', label: 'Aplicación Web', icon: Code, description: 'Aplicación web interactiva', color: 'from-orange-400 to-red-400' },
    { value: 'blog', label: 'Blog/CMS', icon: Zap, description: 'Sistema de gestión de contenido', color: 'from-pink-400 to-rose-400' }
  ];

  const nivelesComplejidad = [
    { value: 'basica', label: 'Básica', multiplier: 1, description: 'Funcionalidades esenciales' },
    { value: 'intermedia', label: 'Intermedia', multiplier: 1.5, description: 'Funcionalidades avanzadas' },
    { value: 'avanzada', label: 'Avanzada', multiplier: 2, description: 'Desarrollo complejo' },
    { value: 'compleja', label: 'Compleja', multiplier: 3, description: 'Soluciones empresariales' }
  ];

  const funcionalidadesDisponibles: Feature[] = [
    { id: 'responsive_design', label: 'Diseño Responsivo', icon: '📱' },
    { id: 'cms', label: 'Sistema CMS', icon: '⚙️' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'multiidioma', label: 'Multi-idioma', icon: '🌍' },
    { id: 'seo_avanzado', label: 'SEO Avanzado', icon: '🔍' },
    { id: 'integraciones_apis', label: 'APIs Integration', icon: '🔗' },
    { id: 'panel_admin', label: 'Panel Admin', icon: '👤' },
    { id: 'chat_soporte', label: 'Chat de Soporte', icon: '💬' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'seguridad_avanzada', label: 'Seguridad Avanzada', icon: '🔒' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFuncionalidadChange = (funcionalidad: string) => {
    setFormData(prev => ({
      ...prev,
      funcionalidades: prev.funcionalidades.includes(funcionalidad)
        ? prev.funcionalidades.filter(f => f !== funcionalidad)
        : [...prev.funcionalidades, funcionalidad]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectData: {
            type: formData.tipoProyecto,
            complexity: formData.complejidad,
            features: formData.funcionalidades,
            deliveryTime: formData.tiempoEntrega,
            budget: formData.presupuestoReferencia
          }
        }),
      });

      if (!response.ok) {
        let errorMsg = `Error del servidor (${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg += `: ${errorData.message}`;
          }
        } catch {
          // ignore JSON parse error
        }
        throw new Error(errorMsg);
      }

      let data: any;
      try {
        data = await response.json();
      } catch {
        throw new Error('La respuesta del servidor no es un JSON válido.');
      }

      // Validar estructura esperada
      if (
        typeof data !== 'object' ||
        data === null ||
        typeof data.costoTotal !== 'number' ||
        typeof data.tiempoDesarrollo !== 'string' ||
        typeof data.horasTotales !== 'number'
      ) {
        throw new Error('La respuesta del servidor tiene un formato inesperado.');
      }

      setEstimacion(data);
    } catch (err) {
      if (err instanceof TypeError) {
        setError('No se pudo conectar con el servidor. Verifique su conexión a Internet.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-75 animate-pulse"></div>
              <Calculator className="relative w-16 h-16 text-white" />
            </div>
            <Sparkles className="w-8 h-8 text-yellow-400 ml-4 animate-spin" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
            CalculadoraProyectos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estimador de costos inteligente para agencias web con IA avanzada
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-400'
                  }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gray-700'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8">
            <div>
              {/* Step 1: Tipo de Proyecto */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Globe className="w-8 h-8 mr-3 text-cyan-400" />
                    ¿Qué tipo de proyecto necesitas?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tiposProyecto.map((tipo) => {
                      const IconComponent = tipo.icon;
                      return (
                        <div
                          key={tipo.value}
                          onClick={() => setFormData(prev => ({ ...prev, tipoProyecto: tipo.value }))}
                          className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:rotate-1 ${formData.tipoProyecto === tipo.value
                              ? `bg-gradient-to-br ${tipo.color} shadow-2xl ring-4 ring-white/50`
                              : 'bg-white/5 hover:bg-white/10 border border-white/20'
                            }`}
                        >
                          <div className="text-center">
                            <IconComponent className="w-12 h-12 mx-auto mb-4 text-white" />
                            <h3 className="text-xl font-bold text-white mb-2">{tipo.label}</h3>
                            <p className="text-gray-300 text-sm">{tipo.description}</p>
                          </div>
                          {formData.tipoProyecto === tipo.value && (
                            <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-white" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Complejidad */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3 text-purple-400" />
                    Nivel de complejidad
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nivelesComplejidad.map((nivel) => (
                      <div
                        key={nivel.value}
                        onClick={() => setFormData(prev => ({ ...prev, complejidad: nivel.value }))}
                        className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.complejidad === nivel.value
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl ring-4 ring-white/50'
                            : 'bg-white/5 hover:bg-white/10 border border-white/20'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">{nivel.label}</h3>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                            {nivel.multiplier}x
                          </span>
                        </div>
                        <p className="text-gray-300">{nivel.description}</p>
                        {formData.complejidad === nivel.value && (
                          <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Funcionalidades */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Zap className="w-8 h-8 mr-3 text-yellow-400" />
                    Funcionalidades adicionales
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {funcionalidadesDisponibles.map((func) => (
                      <div
                        key={func.id}
                        onClick={() => handleFuncionalidadChange(func.id)}
                        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.funcionalidades.includes(func.id)
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg ring-2 ring-white/50'
                            : 'bg-white/5 hover:bg-white/10 border border-white/20'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{func.icon}</span>
                          <span className="text-white font-medium">{func.label}</span>
                        </div>
                        {formData.funcionalidades.includes(func.id) && (
                          <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Detalles finales */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Clock className="w-8 h-8 mr-3 text-green-400" />
                    Detalles del proyecto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-3">Tiempo de entrega</label>
                      <select
                        name="tiempoEntrega"
                        value={formData.tiempoEntrega}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1-2 semanas">1-2 semanas</option>
                        <option value="3-4 semanas">3-4 semanas</option>
                        <option value="1-2 meses">1-2 meses</option>
                        <option value="3+ meses">3+ meses</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">Presupuesto de referencia (ARS)</label>
                      <input
                        type="number"
                        name="presupuestoReferencia"
                        value={formData.presupuestoReferencia}
                        onChange={handleInputChange}
                        placeholder="Ingrese su presupuesto"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Anterior</span>
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !formData.tipoProyecto) ||
                      (currentStep === 2 && !formData.complejidad)
                    }
                    className="ml-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                    disabled={loading || !formData.tiempoEntrega}
                    className="ml-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Calculando...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        <span>Obtener Estimación</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {estimacion && (
            <div className="mt-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-3xl p-8 backdrop-blur-sm animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">¡Estimación Completada!</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm mb-1">Costo Total</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(estimacion.costoTotal)}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm mb-1">Tiempo</p>
                  <p className="text-2xl font-bold text-white">{estimacion.tiempoDesarrollo}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm mb-1">Horas</p>
                  <p className="text-2xl font-bold text-white">{estimacion.horasTotales}h</p>
                </div>
              </div>

              {estimacion.desglose && (
                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                  <h4 className="text-xl font-bold text-white mb-4">Desglose de Costos</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Diseño</span>
                      <span className="text-white font-semibold">{formatCurrency(estimacion.desglose.diseno)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Desarrollo</span>
                      <span className="text-white font-semibold">{formatCurrency(estimacion.desglose.desarrollo)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Testing</span>
                      <span className="text-white font-semibold">{formatCurrency(estimacion.desglose.testing)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Gestión</span>
                      <span className="text-white font-semibold">{formatCurrency(estimacion.desglose.gestionProyecto)}</span>
                    </div>
                  </div>
                </div>
              )}

              {estimacion.recomendaciones && (
                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Recomendaciones</h4>
                  <ul className="space-y-2">
                    {estimacion.recomendaciones.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-center space-x-4 mt-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  Descargar PDF
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                  Enviar por Email
                </button>
              </div>
            </div>
          )}
        </div>      </div>
    </div>
  );
};

export default WebAgencyEstimator;