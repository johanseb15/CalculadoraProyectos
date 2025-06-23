const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configuraciones del sistema
const PROJECT_TYPES = {
  landing: { name: 'Landing Page', baseHours: 15, multiplier: 1 },
  portfolio: { name: 'Portfolio/Showcase', baseHours: 25, multiplier: 1.2 },
  corporate: { name: 'Sitio Corporativo', baseHours: 40, multiplier: 1.8 },
  ecommerce: { name: 'E-commerce', baseHours: 80, multiplier: 3 },
  webapp: { name: 'App Web React', baseHours: 120, multiplier: 4 }
};

const COMPLEXITY_MULTIPLIERS = {
  simple: { name: 'Básico', multiplier: 0.7 },
  medium: { name: 'Intermedio', multiplier: 1 },
  complex: { name: 'Avanzado', multiplier: 1.5 },
  enterprise: { name: 'Empresarial', multiplier: 2.2 }
};

const AVAILABLE_FEATURES = [
  { id: 'seo', name: 'SEO + Meta Tags', hours: 6 },
  { id: 'forms', name: 'Formularios Avanzados', hours: 8 },
  { id: 'animations', name: 'Animaciones/Micro-interacciones', hours: 12 },
  { id: 'cms', name: 'Panel Admin Básico', hours: 15 },
  { id: 'analytics', name: 'Google Analytics + Pixels', hours: 4 },
  { id: 'whatsapp', name: 'Integración WhatsApp', hours: 3 },
  { id: 'chatbot', name: 'Chatbot IA', hours: 20 },
  { id: 'api', name: 'Integración APIs', hours: 16 }
];

// Configuración de riesgos
const RISKS_DATABASE = [
  { 
    category: 'Técnico', 
    items: [
      { 
        name: 'Cambios de alcance', 
        probability: 'Alta', 
        impact: 'Alto', 
        mitigation: 'Contrato detallado con cambios facturables',
        riskMultiplier: 1.3
      },
      { 
        name: 'Problemas de integración', 
        probability: 'Media', 
        impact: 'Medio', 
        mitigation: 'Testing temprano y documentación',
        riskMultiplier: 1.15
      },
      { 
        name: 'Limitaciones de plataforma', 
        probability: 'Baja', 
        impact: 'Alto', 
        mitigation: 'Evaluación técnica previa',
        riskMultiplier: 1.4
      }
    ]
  },
  {
    category: 'Negocio',
    items: [
      { 
        name: 'Cliente no paga', 
        probability: 'Media', 
        impact: 'Alto', 
        mitigation: '50% adelanto, contratos claros',
        riskMultiplier: 1.0
      },
      { 
        name: 'Competencia con precios bajos', 
        probability: 'Alta', 
        impact: 'Medio', 
        mitigation: 'Diferenciación por IA y velocidad',
        riskMultiplier: 0.9
      },
      { 
        name: 'Dependencia de herramientas', 
        probability: 'Media', 
        impact: 'Medio', 
        mitigation: 'Diversificar stack tecnológico',
        riskMultiplier: 1.1
      }
    ]
  }
];

// Utilidades de cálculo
const calculateBaseEstimate = (projectData, teamData) => {
  const projectType = PROJECT_TYPES[projectData.type];
  const complexity = COMPLEXITY_MULTIPLIERS[projectData.complexity];
  
  if (!projectType || !complexity) {
    throw new Error('Tipo de proyecto o complejidad inválidos');
  }

  const baseHours = projectType.baseHours;
  const typeMultiplier = projectType.multiplier;
  const complexityMultiplier = complexity.multiplier;
  
  // Calcular horas de características adicionales
  const featuresHours = projectData.features?.reduce((total, featureId) => {
    const feature = AVAILABLE_FEATURES.find(f => f.id === featureId);
    return total + (feature ? feature.hours : 0);
  }, 0) || 0;

  // Horas totales antes de IA
  const totalHours = (baseHours + featuresHours) * typeMultiplier * complexityMultiplier;
  
  // Reducción por IA (máximo 35% de reducción)
  const aiReduction = (projectData.aiAutomation || 50) / 100;
  const finalHours = totalHours * (1 - aiReduction * 0.35);
  
  // Cálculos de costo
  const hourlyRate = teamData.hourlyRate || 25;
  const baseCostUSD = finalHours * hourlyRate;
  const overheadPercent = teamData.overheadPercent || 20;
  const overhead = baseCostUSD * (overheadPercent / 100);
  const totalCostUSD = baseCostUSD + overhead;
  
  // Conversión a pesos argentinos
  const usdToArs = 1200; // Podrías hacer esto dinámico con una API
  const totalCostARS = totalCostUSD * usdToArs;

  // Cálculo de tiempo en semanas
  const teamSize = teamData.teamSize || 1;
  const hoursPerWeek = 30; // Horas productivas por semana por persona
  const timeWeeks = Math.ceil(finalHours / (hoursPerWeek * teamSize));

  return {
    hours: Math.round(finalHours),
    costUSD: Math.round(totalCostUSD),
    costARS: Math.round(totalCostARS),
    baseCost: Math.round(baseCostUSD),
    overhead: Math.round(overhead),
    timeWeeks,
    breakdown: {
      baseHours,
      featuresHours,
      typeMultiplier,
      complexityMultiplier,
      aiReduction: Math.round(aiReduction * 35), // Porcentaje real de reducción
      hourlyRate,
      overheadPercent
    }
  };
};

const calculateScenarios = (baseEstimate) => {
  const baseARS = baseEstimate.costARS;
  const baseUSD = baseEstimate.costUSD;
  
  return {
    conservative: { 
      ars: Math.round(baseARS * 1.4), 
      usd: Math.round(baseUSD * 1.4),
      description: 'Cliente indeciso, múltiples revisiones, cambios de alcance'
    },
    realistic: { 
      ars: baseARS, 
      usd: baseUSD,
      description: 'Cliente colaborativo, proceso fluido, sin imprevistos'
    },
    optimistic: { 
      ars: Math.round(baseARS * 0.75), 
      usd: Math.round(baseUSD * 0.75),
      description: 'Cliente ideal, contenido listo, máxima automatización'
    }
  };
};

// Endpoints

// Saludo básico
app.get("/api/saludo", (req, res) => {
  res.json({ 
    mensaje: "¡Hola desde el backend de la Calculadora de Agencia Web con IA!",
    version: "2.0",
    timestamp: new Date().toISOString()
  });
});

// Obtener configuraciones del sistema
app.get("/api/config", (req, res) => {
  res.json({
    projectTypes: PROJECT_TYPES,
    complexityMultipliers: COMPLEXITY_MULTIPLIERS,
    availableFeatures: AVAILABLE_FEATURES,
    defaultSettings: {
      hourlyRate: 25,
      teamSize: 1,
      overheadPercent: 20,
      aiAutomation: 50
    }
  });
});

// Cálculo de estimación principal
app.post('/api/estimate', (req, res) => {
  try {
    const { projectData, teamData } = req.body;
    
    // Validaciones básicas
    if (!projectData || !projectData.type) {
      return res.status(400).json({ error: 'Datos de proyecto requeridos' });
    }

    if (!PROJECT_TYPES[projectData.type]) {
      return res.status(400).json({ error: 'Tipo de proyecto inválido' });
    }

    if (!COMPLEXITY_MULTIPLIERS[projectData.complexity]) {
      return res.status(400).json({ error: 'Complejidad inválida' });
    }

    const estimate = calculateBaseEstimate(projectData, teamData || {});
    const scenarios = calculateScenarios(estimate);
    
    res.json({
      estimate,
      scenarios,
      projectData,
      teamData,
      calculatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en cálculo de estimación:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Obtener matriz de riesgos
app.get('/api/risks', (req, res) => {
  res.json({
    risks: RISKS_DATABASE,
    riskLevels: {
      probability: ['Baja', 'Media', 'Alta'],
      impact: ['Bajo', 'Medio', 'Alto']
    }
  });
});

// Cálculo específico de riesgos para un proyecto
app.post('/api/risks/calculate', (req, res) => {
  try {
    const { projectData, selectedRisks } = req.body;
    
    if (!selectedRisks || !Array.isArray(selectedRisks)) {
      return res.status(400).json({ error: 'Riesgos seleccionados requeridos' });
    }

    // Calcular multiplicador de riesgo total
    let totalRiskMultiplier = 1.0;
    const applicableRisks = [];

    RISKS_DATABASE.forEach(category => {
      category.items.forEach(risk => {
        if (selectedRisks.includes(risk.name)) {
          totalRiskMultiplier *= risk.riskMultiplier;
          applicableRisks.push({
            ...risk,
            category: category.category
          });
        }
      });
    });

    // Recalcular estimación con riesgos
    const baseEstimate = calculateBaseEstimate(projectData, req.body.teamData || {});
    const adjustedEstimate = {
      ...baseEstimate,
      costUSD: Math.round(baseEstimate.costUSD * totalRiskMultiplier),
      costARS: Math.round(baseEstimate.costARS * totalRiskMultiplier),
      hours: Math.round(baseEstimate.hours * totalRiskMultiplier)
    };

    res.json({
      baseEstimate,
      adjustedEstimate,
      totalRiskMultiplier: Math.round(totalRiskMultiplier * 100) / 100,
      applicableRisks,
      riskAdjustment: {
        costIncrease: adjustedEstimate.costUSD - baseEstimate.costUSD,
        percentIncrease: Math.round(((totalRiskMultiplier - 1) * 100) * 100) / 100
      }
    });

  } catch (error) {
    console.error('Error en cálculo de riesgos:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Obtener plantillas de contratos
app.get('/api/contracts', (req, res) => {
  const contractTemplates = {
    client: {
      title: 'Contrato Cliente - Desarrollo Web',
      sections: [
        {
          name: 'Alcance del Proyecto',
          content: 'Definición detallada de entregables, funcionalidades y características técnicas.'
        },
        {
          name: 'Cronograma y Entrega',
          content: 'Hitos del proyecto, fechas de entrega y proceso de revisión.'
        },
        {
          name: 'Términos de Pago',
          content: '50% adelanto al inicio, 50% al completar el proyecto satisfactoriamente.'
        },
        {
          name: 'Revisiones y Cambios',
          content: 'Máximo 3 rondas de revisiones incluidas. Cambios adicionales se facturan por separado.'
        },
        {
          name: 'Propiedad Intelectual',
          content: 'Cliente recibe derechos completos del código y diseño final.'
        },
        {
          name: 'Soporte Post-Entrega',
          content: '30 días de soporte técnico gratuito posterior a la entrega.'
        }
      ]
    },
    collaborator: {
      title: 'Contrato Colaborador - Desarrollo Web',
      sections: [
        {
          name: 'Modalidades de Trabajo',
          content: 'Freelancer por proyecto, colaborador recurrente, o socio estratégico.'
        },
        {
          name: 'Responsabilidades',
          content: 'Estándares de código, uso de herramientas IA, comunicación regular.'
        },
        {
          name: 'Compensación',
          content: 'Tarifas por hora según experiencia más bonos por cumplimiento.'
        },
        {
          name: 'Confidencialidad',
          content: 'Protección de información de clientes y proyectos.'
        }
      ]
    }
  };

  res.json(contractTemplates);
});

// Análisis de tecnologías
app.get('/api/technologies', (req, res) => {
  const techAnalysis = {
    platforms: [
      {
        name: 'WordPress + Elementor',
        pros: ['Bajo costo inicial', 'Gran ecosistema', 'Fácil gestión cliente', 'SEO-friendly'],
        cons: ['Puede ser lento', 'Vulnerabilidades', 'Limitaciones diseño', 'Dependencia plugins'],
        recommendedFor: 'Proyectos iniciales, presupuestos limitados',
        costRange: { min: 500, max: 2000 }
      },
      {
        name: 'Webflow',
        pros: ['Diseño visual avanzado', 'Código limpio', 'Hosting incluido', 'CMS integrado'],
        cons: ['Costo mensual alto', 'Curva aprendizaje', 'Menos plugins', 'Limitaciones código'],
        recommendedFor: 'Clientes premium, diseños complejos',
        costRange: { min: 1500, max: 5000 }
      },
      {
        name: 'Framer',
        pros: ['Animaciones avanzadas', 'Componentes reutilizables', 'Integración Figma', 'Performance'],
        cons: ['Nuevo mercado', 'Opciones hosting limitadas', 'CMS limitado', 'Comunidad pequeña'],
        recommendedFor: 'Startups, portfolios creativos',
        costRange: { min: 1000, max: 3500 }
      }
    ],
    aiTools: [
      { name: 'GitHub Copilot', purpose: 'Autocompletado código', monthlyeCost: 10 },
      { name: 'ChatGPT Pro', purpose: 'Consultas técnicas', monthlyCost: 20 },
      { name: 'Figma AI', purpose: 'Diseño automatizado', monthlyCost: 15 },
      { name: 'Zapier', purpose: 'Automatización workflows', monthlyCost: 25 }
    ]
  };

  res.json(techAnalysis);
});

// Endpoint para guardar configuraciones personalizadas (simulado)
app.post('/api/settings', (req, res) => {
  const { teamData, preferences } = req.body;
  
  // En un proyecto real, aquí guardarías en base de datos
  console.log('Configuraciones guardadas:', { teamData, preferences });
  
  res.json({
    message: 'Configuraciones guardadas exitosamente',
    savedAt: new Date().toISOString(),
    settings: { teamData, preferences }
  });
});

// Endpoint de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0'
  });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /api/saludo',
      'GET /api/config',
      'POST /api/estimate',
      'GET /api/risks',
      'POST /api/risks/calculate',
      'GET /api/contracts',
      'GET /api/technologies',
      'POST /api/settings',
      'GET /api/health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📊 Calculadora de Agencia Web con IA v2.0`);
  console.log(`🔧 Endpoints disponibles:`);
  console.log(`   - GET /api/saludo`);
  console.log(`   - GET /api/config`);
  console.log(`   - POST /api/estimate`);
  console.log(`   - GET /api/risks`);
  console.log(`   - POST /api/risks/calculate`);
  console.log(`   - GET /api/contracts`);
  console.log(`   - GET /api/technologies`);
  console.log(`   - POST /api/settings`);
  console.log(`   - GET /api/health`);
});