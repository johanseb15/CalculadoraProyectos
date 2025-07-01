// Budget selector
import React from 'react';
const options = [
  { value: '0-5000', label: '$0 - $5,000', desc: 'Presupuesto básico' },
  { value: '5000-15000', label: '$5,000 - $15,000', desc: 'Presupuesto medio' },
  { value: '15000-30000', label: '$15,000 - $30,000', desc: 'Presupuesto alto' },
  { value: '30000+', label: '$30,000+', desc: 'Presupuesto enterprise' },
];
import PropTypes from 'prop-types';

const BudgetSelector = ({ formData, setFormData }) => (
  // ... component implementation
);

BudgetSelector.propTypes = {
  formData: PropTypes.shape({
    budget: PropTypes.string
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};  <div>
    <h3 className="text-xl font-semibold text-white mb-4">Rango de presupuesto</h3>
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setFormData({ ...formData, budget: option.value })}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            formData.budget === option.value
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
export default BudgetSelector;
