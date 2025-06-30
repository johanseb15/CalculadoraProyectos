export interface PricingConfig {
  basePrices: Record<string, number>;
  featurePrices: Record<string, number>;
  complexityMultipliers: Record<string, number>;
  additionalPageCost: number;
}

export const defaultPricingConfig: PricingConfig = {
  basePrices: {
    'basic-website': 500,
    'ecommerce': 1500,
    'web-app': 3000,
    'landing-page': 300,
    'redesign': 800,
  },
  featurePrices: {
    'seo': 200,
    'responsive': 150,
    'admin-panel': 400,
    'payments': 300,
    'live-chat': 100,
    'blog': 200,
    'gallery': 100,
    'contact-forms': 50,
  },
  complexityMultipliers: {
    'low': 1,
    'medium': 1.5,
    'high': 2.5,
  },
  additionalPageCost: 100,
};
