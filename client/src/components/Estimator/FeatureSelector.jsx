// Feature selector
import React from 'react';
import features from '../../config/features';
import { Check, Info, Sparkles } from 'lucide-react';

const FeatureSelector = ({ formData, setFormData, highlightedFeature, setHighlightedFeature }) => {
  const toggleFeature = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId],
    }));
    setHighlightedFeature(featureId);
    setTimeout(() => setHighlightedFeature(null), 700);
  };
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        Características adicionales
        <Info className="h-4 w-4 text-purple-300 cursor-pointer" title="Selecciona las funcionalidades extra que tu proyecto necesita. Cada una suma al costo final." />
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.length === 0 && (
          <div className="text-purple-300 text-center py-8">
            <Sparkles className="mx-auto mb-2" />
            Empieza agregando una característica...
          </div>
        )}
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => toggleFeature(feature.id)}
            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between relative group ${
              formData.features.includes(feature.id)
                ? 'border-purple-500 bg-purple-500/20'
                : 'border-white/20 bg-white/5 hover:border-purple-500/50'
            }`}
          >
            <div className="text-white font-medium flex items-center gap-1">
              {feature.name}
              <Info className="h-3 w-3 text-purple-300 ml-1" title={`Más info sobre ${feature.name}`} />
            </div>
            <div className="text-purple-400 text-sm">+${feature.price.toLocaleString()}</div>
            {formData.features.includes(feature.id) && (
              <Check className="h-5 w-5 text-purple-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FeatureSelector;
