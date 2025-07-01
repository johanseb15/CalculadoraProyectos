import React, { useState } from 'react';

export default function CTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    // Aquí puedes integrar tu backend, CRM o servicio de email
  };

  return (
    <section id="cta" className="py-20">
      <div className="max-w-lg mx-auto bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para estimar tu próximo proyecto?</h2>
        <p className="mb-6 text-purple-200">Solicita una demo gratuita o agenda una asesoría personalizada.</p>
        {sent ? (
          <div className="text-green-400 font-semibold py-8">¡Gracias! Te contactaremos pronto.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" required placeholder="Nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none" />
            <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none" />
            <textarea required placeholder="¿En qué te ayudo?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none" />
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition">Enviar</button>
          </form>
        )}
      </div>
    </section>
  );
}
