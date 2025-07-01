import React, { useState } from 'react';

export default function CTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = e => {
    e.preventDefault();

    // TODO: Implement actual form submission
    // Example implementation:
    try {
      // await submitContactForm(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      // Handle submission errors
      console.error('Form submission failed:', error);
    }
  };
  return (
    <section id="cta" className="py-20">
      <div className="max-w-lg mx-auto bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para estimar tu próximo proyecto?</h2>
        <p className="mb-6 text-purple-200">Solicita una demo gratuita o agenda una asesoría personalizada.</p>
        {sent ? (
          <div className="text-green-400 font-semibold py-8">¡Gracias! Te contactaremos pronto.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="cta-name" className="block text-left text-white font-medium mb-1">Nombre</label>
              <input
                id="cta-name"
                type="text"
                required
                minLength={2}
                aria-required="true"
                aria-invalid={form.name.length > 0 && form.name.length < 2}
                placeholder="Nombre"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="cta-email" className="block text-left text-white font-medium mb-1">Email</label>
              <input
                id="cta-email"
                type="email"
                required
                pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                aria-required="true"
                aria-invalid={form.email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)}
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="cta-message" className="block text-left text-white font-medium mb-1">¿En qué te ayudo?</label>
              <textarea
                id="cta-message"
                required
                minLength={5}
                aria-required="true"
                aria-invalid={form.message.length > 0 && form.message.length < 5}
                placeholder="¿En qué te ayudo?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition">
              Enviar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
