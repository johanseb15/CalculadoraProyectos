// Estimator result view
import React from 'react';
import { Download, Eye, Plus, ArrowRight, Check } from 'lucide-react';
import projectTypes from '../../config/projectTypes';
import complexityMultipliers from '../../config/pricing';

const EstimatorResult = ({ estimatedCost, formData, resetCalculator }) => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 mb-6">
        <Check className="h-4 w-4 text-green-400" />
        <span className="text-sm text-green-200">Estimación completada</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tu estimación está lista</h1>
      <p className="text-xl text-purple-200">Basada en tus requerimientos y potenciada por IA</p>
    </div>
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Result */}
      <div className="lg:col-span-2">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              ${estimatedCost?.total.toLocaleString()}
            </div>
            <p className="text-xl text-purple-200">Costo estimado del proyecto</p>
          </div>
          {/* Breakdown */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-white">Desglose de costos:</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-purple-200">Proyecto base</span>
                <span className="text-white font-semibold">${estimatedCost?.breakdown.base.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-purple-200">Características adicionales</span>
                <span className="text-white font-semibold">${estimatedCost?.breakdown.features.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-purple-200">Ajuste por complejidad</span>
                <span className="text-white font-semibold">x{estimatedCost?.breakdown.complexity}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-purple-200">Ajuste por timeline</span>
                <span className="text-white font-semibold">x{estimatedCost?.breakdown.timeline}</span>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              <Download className="h-5 w-5" />
              <span>Descargar PDF</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
              <Eye className="h-5 w-5" />
              <span>Ver Detalles</span>
            </button>
          </div>
        </div>
      </div>
      {/* Side Panel */}
      <div className="space-y-6">
        {/* Project Summary */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resumen del proyecto</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-200">Tipo:</span>
              <span className="text-white">{projectTypes.find(p => p.id === formData.projectType)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Complejidad:</span>
              <span className="text-white">{complexityMultipliers[formData.complexity].label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Timeline:</span>
              <span className="text-white">{formData.timeline} semanas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Características:</span>
              <span className="text-white">{formData.features.length}</span>
            </div>
          </div>
        </div>
        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Próximos pasos</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">1</div>
              <div>
                <p className="text-white text-sm font-medium">Revisión de propuesta</p>
                <p className="text-purple-200 text-xs">Analizaremos tus requerimientos en detalle</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">2</div>
              <div>
                <p className="text-white text-sm font-medium">Propuesta personalizada</p>
                <p className="text-purple-200 text-xs">Te enviaremos una cotización detallada</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">3</div>
              <div>
                <p className="text-white text-sm font-medium">Inicio del proyecto</p>
                <p className="text-purple-200 text-xs">Comenzamos el desarrollo una vez aprobado</p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">¿Tienes preguntas?</h3>
          <p className="text-purple-200 text-sm mb-4">Nuestro equipo está listo para ayudarte</p>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all">
            <span>Contactar ahora</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    {/* Reset Button */}
    <div className="text-center mt-8">
      <button onClick={resetCalculator} className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
        <Plus className="h-4 w-4" />
        <span>Nueva estimación</span>
      </button>
    </div>
  </div>
);
export default EstimatorResult;
