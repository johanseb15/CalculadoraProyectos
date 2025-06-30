const express = require('express');
const router = express.Router();

// Endpoint para calcular estimaciones
router.post('/estimate', (req, res) => {
  try {
    const { 
      projectType, 
      features = [], 
      complexity = 'Media',
      pages = 1,
      integrations = []
    } = req.body;

    console.log('Calculando estimación para:', { projectType, complexity, features });

    // Precios base por tipo de proyecto
    const basePrices = {
      'Sitio web básico': 500,
      'E-commerce': 1500,
      'Aplicación web': 3000,
      'Landing page': 300,
      'Rediseño web': 800
    };

    // Precios por características adicionales
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

    // Multiplicadores por complejidad
    const complexityMultipliers = {
      'Baja': 1,
      'Media': 1.5,
      'Alta': 2.5
    };

    // Cálculo base
    let basePrice = basePrices[projectType] || 500;
    
    // Agregar costo por páginas adicionales
    if (pages > 1) {
      basePrice += (pages - 1) * 100;
    }

    // Agregar costo por características
    let featuresPrice = 0;
    features.forEach(feature => {
      featuresPrice += featurePrices[feature] || 0;
    });

    // Aplicar multiplicador de complejidad
    const complexityMultiplier = complexityMultipliers[complexity] || 1;
    const totalPrice = (basePrice + featuresPrice) * complexityMultiplier;

    // Calcular tiempo estimado (1 semana por cada $200)
    const estimatedWeeks = Math.ceil(totalPrice / 200);

    const response = {
      success: true,
      estimate: {
        projectType,
        basePrice,
        featuresPrice,
        complexity,
        complexityMultiplier,
        totalPrice: Math.round(totalPrice),
        estimatedWeeks,
        timeline: `${estimatedWeeks} semana${estimatedWeeks > 1 ? 's' : ''}`,
        breakdown: {
          base: basePrice,
          features: featuresPrice,
          complexity: `x${complexityMultiplier}`,
          pages: pages > 1 ? `+${(pages - 1) * 100} (páginas adicionales)` : null
        },
        features: features,
        createdAt: new Date().toISOString()
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Error en /api/estimate:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

module.exports = router;
