import { useState } from 'react';
import projectTypes from '../config/projectTypes';
import features from '../config/features';
import complexityMultipliers from '../config/pricing';

const initialFormData = {
  projectType: '',
  complexity: 'medium',
  features: [],
  timeline: '4-6',
  budget: '',
  clientName: '',
  email: ''
};

// Hook for estimator logic
const useEstimator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [highlightedFeature, setHighlightedFeature] = useState(null);
  
  const calculateEstimate = async () => {
    setIsCalculating(true);
    try {
      const selectedProject = projectTypes.find(p => p.id === formData.projectType);
      if (!selectedProject) {
        throw new Error('Project type not found');
      }
      const basePrice = selectedProject.basePrice || 0;
      const featuresPrice = formData.features.reduce((total, featureId) => {
        const feature = features.find(f => f.id === featureId);
        return total + (feature?.price || 0);
      }, 0);
      const complexityMultiplier = complexityMultipliers[formData.complexity].multiplier;
      const timelineMultiplier =
        formData.timeline === '2-4'
          ? 1.3
          : formData.timeline === '6-8'
          ? 0.9
          : 1;
      const totalCost = Math.round(
        (basePrice + featuresPrice) *
          complexityMultiplier *
          timelineMultiplier
      );
      setEstimatedCost({
        total: totalCost,
        breakdown: {
          base: basePrice,
          features: featuresPrice,
          complexity: complexityMultiplier,
          timeline: timelineMultiplier,
        },
      });
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating estimate:', error);
      // TODO: surface error to the user (e.g. setError state)
    } finally {
      setIsCalculating(false);
    }
  };
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const toggleFeature = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };
  const resetCalculator = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setEstimatedCost(null);
    setShowResults(false);
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    estimatedCost,
    isCalculating,
    showResults,
    highlightedFeature,
    setHighlightedFeature,
    calculateEstimate,
    nextStep,
    prevStep,
    toggleFeature,
    resetCalculator
  };
};
export default useEstimator;
