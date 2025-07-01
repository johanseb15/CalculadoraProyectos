import React from 'react';

export default function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Estimaciones SaaS en minutos</h1>
      <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">Calcula presupuestos profesionales para proyectos web con IA. Rápido, preciso y sin complicaciones.</p>
      <a href="#cta" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition">Probar ahora</a>
    </section>
  );
}
