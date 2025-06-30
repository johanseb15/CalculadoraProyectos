const express = require('express');
const router = express.Router();
const { basePrices, featurePrices, complexityMultipliers } = require('../config/estimationConfig');
const logger = require('../config/logger');

// Endpoint to calculate project estimates
router.post('/estimate', (req, res) => {
  try {
    const { 
      projectType, 
      features = [], 
      complexity = 'Media',
      pages = 1,
      integrations = []
    } = req.body;

    logger.info(`Calculando estimación para: ${JSON.stringify({ projectType, complexity, features })}`);

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
    logger.error(`Error en /api/estimate: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });  }
});

module.exports = router;
