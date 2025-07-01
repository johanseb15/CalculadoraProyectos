// Estimator main component (modularizado)
import React from 'react';
import { EstimatorForm, EstimatorResult } from './index';
import useEstimator from '../../hooks/useEstimator';

const Estimator = () => {
  const estimator = useEstimator();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background, Navigation, etc. pueden ir aquí si son globales */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {!estimator.showResults ? (
          <EstimatorForm {...estimator} />
        ) : (
          <EstimatorResult {...estimator} />
        )}
      </div>
    </div>
  );
};
export default Estimator;
