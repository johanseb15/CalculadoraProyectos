// client/src/components/LandingGenerator.tsx
import { Clock, DollarSign, Zap, Eye, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { generateLanding, LandingData, ProjectData } from '../services/landingService';

function LandingToolbar({ onReset }: { onReset: () => void }) {
  return (
    <nav className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center" aria-label="Herramientas de landing">
      <button
        onClick={onReset}
        className="text-gray-600 hover:text-gray-800"
        aria-label="Volver a resultados"
      >
        ← Volver a resultados
      </button>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 px-3 py-1 rounded" aria-label="Vista previa">
          <Eye size={16} />
          <span className="text-sm">Preview</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 px-3 py-1 rounded" aria-label="Compartir landing">
          <Share2 size={16} />
          <span className="text-sm">Compartir</span>
        </button>
        <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" aria-label="Descargar landing">
          <Download size={16} />
          <span className="text-sm">Descargar</span>
        </button>
      </div>
    </nav>
  );
}

function LandingHeader({ landing }: { landing: LandingData | null }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center" tabIndex={0}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{landing?.titulo}</h1>
      <p className="text-xl md:text-2xl mb-8 opacity-90">{landing?.subtitulo}</p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex items-center space-x-2">
          <Clock size={20} />
          <span>{landing?.tiempo}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign size={20} />
          <span>{landing?.precio}</span>
        </div>
      </div>
      <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors" aria-label="Iniciar proyecto">
        {landing?.textoBoton}
      </button>
    </header>
  );
}

function BenefitsSection({ beneficios }: { beneficios: string[] }) {
  return (
    <section aria-label="Beneficios" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {beneficios.map((beneficio, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="bg-green-100 text-green-600 rounded-full p-1" aria-hidden="true">
            <span className="text-sm font-bold">✓</span>
          </div>
          <span>{beneficio}</span>
        </div>
      ))}
    </section>
  );
}

function ProjectDescription({ descripcion }: { descripcion: string }) {
  return (
    <section className="bg-gray-50 p-8 rounded-lg" aria-label="Descripción del proyecto">
      <h3 className="text-2xl font-bold mb-4">Sobre tu proyecto</h3>
      <p className="text-gray-700 leading-relaxed">{descripcion}</p>
    </section>
  );
}

function CallToAction({ cta }: { cta: string }) {
  return (
    <section className="text-center mt-12" aria-label="Llamado a la acción">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-2">{cta}</h3>
        <p className="mb-6">Contactanos hoy mismo y comencemos a trabajar en tu proyecto</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100" aria-label="Contactar ahora">
          Contactar Ahora
        </button>
      </div>
    </section>
  );
}

const LandingGenerator = ({ projectData, onReset }: {
  projectData: ProjectData;
  onReset: () => void;
}) => {
  const [generatedLanding, setGeneratedLanding] = useState<LandingData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerarLanding = async () => {
    setIsGenerating(true);
    const landing = await generateLanding(projectData);
    setGeneratedLanding(landing);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <LandingToolbar onReset={onReset} />
      <main>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <LandingHeader landing={generatedLanding} />
          <div className="p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">¿Por qué elegirnos?</h2>
              {generatedLanding && <BenefitsSection beneficios={generatedLanding.beneficios} />}
              {generatedLanding && <ProjectDescription descripcion={generatedLanding.descripcion} />}
              {generatedLanding && <CallToAction cta={generatedLanding.cta} />}
            </div>
          </div>
        </div>
      </main>
      <div className="mt-6 text-center">
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-800"
          aria-label="Calcular otro proyecto"
        >
          ← Calcular otro proyecto
        </button>
      </div>
    </div>
  );
};

export default LandingGenerator;