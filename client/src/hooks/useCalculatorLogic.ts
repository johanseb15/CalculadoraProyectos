import { useState, useMemo } from 'react';
import { PricingConfig, defaultPricingConfig } from '../config/pricingConfig';

export interface CalculatorInput {
  projectType: string;
  features: string[];
  complexity: string;
  pages: number;
}

export function useCalculatorLogic(
  initial: CalculatorInput,
  config: PricingConfig = defaultPricingConfig
) {
  const [input, setInput] = useState<CalculatorInput>(initial);

  const result = useMemo(() => {
    const { basePrices, featurePrices, complexityMultipliers, additionalPageCost } = config;
    let base = basePrices[input.projectType] || 500;
    if (input.pages > 1) base += (input.pages - 1) * additionalPageCost;
    let features = input.features.reduce((acc, f) => acc + (featurePrices[f] || 0), 0);
    const multiplier = complexityMultipliers[input.complexity] || 1;
    const total = (base + features) * multiplier;
    return {
      base,
      features,
      multiplier,
      total: Math.round(total),
    };
  }, [input, config]);

  return { input, setInput, result };
}
