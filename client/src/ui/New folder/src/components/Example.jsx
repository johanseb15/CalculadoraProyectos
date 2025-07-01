import React from 'react';

export default function Example() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">¿Cómo funciona?</h2>
      <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-2xl p-8">
        <ol className="text-left space-y-4 text-purple-100">
          <li><span className="font-bold text-white">1.</span> Eliges el tipo de proyecto y características.</li>
          <li><span className="font-bold text-white">2.</span> Ajustas la complejidad y detalles.</li>
          <li><span className="font-bold text-white">3.</span> Recibes el presupuesto y puedes descargar el PDF.</li>
        </ol>
      </div>
    </section>
  );
}
