const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'CalculadoraProyectos API funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Endpoint principal para estimaciones
app.post('/api/estimate', (req, res) => {
  try {
    const { 
      projectType, 
      features = [], 
      complexity = 'Media',
      pages = 1 
    } = req.body;

    console.log('📊 Nueva estimación:', { projectType, complexity, features });

    // Precios base
    const basePrices = {
      'Sitio web básico': 500,
      'E-commerce': 1500,
      'Aplicación web': 3000,
      'Landing page': 300,
      'Rediseño web': 800
    };

    // Precios por características
    const featurePrices = {
      'SEO optimizado': 200,
      'Diseño responsive': 150,
      'Panel de administración': 400,
      'Integración de pagos': 300,
      'Chat en vivo': 100,
      'Blog': 200,
      'Galería de imágenes': 100,
      'Formularios de contacto': 50
    };

    // Multiplicadores
    const complexityMultipliers = {
      'Baja': 1,
      'Media': 1.5,
      'Alta': 2.5
    };

    // Cálculos
    let basePrice = basePrices[projectType] || 500;
    
    // Páginas adicionales
    if (pages > 1) {
      basePrice += (pages - 1) * 100;
    }

    // Características
    let featuresPrice = 0;
    features.forEach(feature => {
      featuresPrice += featurePrices[feature] || 0;
    });

    // Total con complejidad
    const complexityMultiplier = complexityMultipliers[complexity] || 1;
    const totalPrice = (basePrice + featuresPrice) * complexityMultiplier;
    const estimatedWeeks = Math.ceil(totalPrice / 200);

    const response = {
      success: true,
      estimate: {
        projectType,
        basePrice,
        featuresPrice,
        complexity,
        totalPrice: Math.round(totalPrice),
        estimatedWeeks,
        timeline: `${estimatedWeeks} semana${estimatedWeeks > 1 ? 's' : ''}`,
        breakdown: {
          base: `$${basePrice}`,
          features: `$${featuresPrice}`,
          complexity: `x${complexityMultiplier}`,
          total: `$${Math.round(totalPrice)}`
        },
        features,
        createdAt: new Date().toISOString()
      }
    };

    res.json(response);

  } catch (error) {
    console.error('❌ Error en estimación:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Otros endpoints
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    projects: []
  });
});

app.post('/api/projects', (req, res) => {
  const project = req.body;
  console.log('💾 Guardando proyecto:', project);
  
  res.json({
    success: true,
    message: 'Proyecto guardado exitosamente',
    project: { ...project, id: Date.now() }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Algo salió mal!'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 CalculadoraProyectos API v1.0.0`);
});