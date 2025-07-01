// Estimator form stepper
import React from 'react';
import projectTypes from '../../config/projectTypes';
import complexityMultipliers from '../../config/pricing';
import FeatureSelector from './FeatureSelector';
import TimelineSelector from './TimelineSelector';
import BudgetSelector from './BudgetSelector';
import ContactForm from './ContactForm';
import { Check, ArrowRight, Sparkles, Info, Shield } from 'lucide-react';

const EstimatorForm = ({
  currentStep,
  formData,
  setFormData,
  nextStep,
  prevStep,
  calculateEstimate,
  isCalculating,
  highlightedFeature,
  setHighlightedFeature
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Step 1: Project Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              ¿Qué tipo de proyecto necesitas?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, projectType: type.id })}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
                    formData.projectType === type.id
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                      : 'border-white/20 bg-white/5 hover:border-purple-500/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                  <p className="text-sm text-purple-200 mb-3">{type.description}</p>
                  <div className="text-purple-400 font-semibold">
                    Desde ${type.basePrice.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Step 2: Complexity & Features */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Nivel de complejidad y características
            </h2>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Complejidad del proyecto</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(complexityMultipliers).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setFormData({ ...formData, complexity: key })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.complexity === key
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{value.label}</div>
                      <div className="text-sm text-purple-200 mt-1">{value.description}</div>
                      <div className="text-purple-400 text-sm mt-2">x{value.multiplier}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <FeatureSelector formData={formData} setFormData={setFormData} highlightedFeature={highlightedFeature} setHighlightedFeature={setHighlightedFeature} />
          </div>
        )}
        {/* Step 3: Timeline & Budget */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Tiempo y presupuesto</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TimelineSelector formData={formData} setFormData={setFormData} />
              <BudgetSelector formData={formData} setFormData={setFormData} />
            </div>
          </div>
        )}
        {/* Step 4: Contact Info */}
        {currentStep === 4 && <ContactForm formData={formData} setFormData={setFormData} />}
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-white/20 gap-4">
          {currentStep > 1 && (
            <button onClick={prevStep} className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all" aria-label="Anterior" title="Anterior">
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Anterior</span>
            </button>
          )}
          <div className="flex-1"></div>
          {currentStep < 4 ? (
            <button onClick={nextStep} disabled={currentStep === 1 && !formData.projectType} className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" aria-label="Siguiente" title="Siguiente">
              <span>Siguiente</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={calculateEstimate} disabled={!formData.clientName || !formData.email || isCalculating} className="flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" aria-label="Calcular Estimación" title="Calcular Estimación">
              {isCalculating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculando...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Calcular Estimación</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EstimatorForm;
