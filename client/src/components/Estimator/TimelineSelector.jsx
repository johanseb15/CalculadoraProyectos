// Timeline selector
import React from 'react';
const options = [
  { value: '2-4', label: '2-4 semanas', desc: 'Entrega rápida (+30%)' },
  { value: '4-6', label: '4-6 semanas', desc: 'Plazo estándar' },
  { value: '6-8', label: '6-8 semanas', desc: 'Plazo extendido (-10%)' },
  { value: '8+', label: '8+ semanas', desc: 'Sin prisa' },
];
const TimelineSelector = ({ formData, setFormData }) => (
  <div>
    <h3 className="text-xl font-semibold text-white mb-4">Plazo de entrega (semanas)</h3>
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setFormData({ ...formData, timeline: option.value })}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            formData.timeline === option.value
              ? 'border-purple-500 bg-purple-500/20'
              : 'border-white/20 bg-white/5 hover:border-purple-500/50'
          }`}
        >
          <div className="text-white font-medium">{option.label}</div>
          <div className="text-purple-200 text-sm">{option.desc}</div>
        </button>
      ))}
    </div>
  </div>
);
export default TimelineSelector;
