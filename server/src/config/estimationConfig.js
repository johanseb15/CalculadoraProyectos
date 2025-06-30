// Configuración centralizada de precios y multiplicadores para estimaciones

const basePrices = {
  'Sitio web básico': 500,
  'E-commerce': 1500,
  'Aplicación web': 3000,
  'Landing page': 300,
  'Rediseño web': 800
};

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

const complexityMultipliers = {
  'Baja': 1,
  'Media': 1.5,
  'Alta': 2.5
};

module.exports = {
  basePrices,
  featurePrices,
  complexityMultipliers
};
