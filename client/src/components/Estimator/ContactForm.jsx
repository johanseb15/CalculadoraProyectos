// Contact form
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
const ContactForm = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({ email: null });
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Información de contacto</h2>
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">Nombre del cliente</label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              const email = e.target.value;
              setFormData({ ...formData, email });
              if (email && !validateEmail(email)) {
                setErrors({ ...errors, email: 'Por favor ingresa un email válido' });
              } else {
                setErrors({ ...errors, email: null });
              }
            }}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-purple-400 mt-0.5" />
          <div>
            <p className="text-sm text-purple-200">
              Tu información está segura. Solo la usamos para enviarte la estimación y futuras comunicaciones sobre tu proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;
