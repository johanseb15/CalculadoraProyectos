import React from 'react';

const benefits = [
  { icon: '⚡', title: 'Rápido', desc: 'Obtén una estimación en menos de 2 minutos.' },
  { icon: '🤖', title: 'IA Precisa', desc: 'Algoritmo inteligente y transparente.' },
  { icon: '📄', title: 'PDF Profesional', desc: 'Descarga tu propuesta lista para enviar.' },
  { icon: '🔒', title: 'Seguro', desc: 'Tus datos y los de tus clientes están protegidos.' },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-slate-800/60">
      <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        {benefits.map(b => (
          <div key={b.title} className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-white/20">
            <div className="text-4xl mb-3">{b.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
            <p className="text-purple-200 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
