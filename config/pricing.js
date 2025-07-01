// config/pricing.js
const complexityMultipliers = {
  low: { multiplier: 0.7, label: 'Básico', description: 'Funcionalidades estándar' },
  medium: { multiplier: 1, label: 'Intermedio', description: 'Personalización moderada' },
  high: { multiplier: 1.5, label: 'Avanzado', description: 'Altamente personalizado' },
  enterprise: { multiplier: 2.2, label: 'Enterprise', description: 'Solución empresarial completa' }
};

export default complexityMultipliers;
