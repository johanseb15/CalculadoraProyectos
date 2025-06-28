export interface LandingData {
  titulo: string;
  subtitulo: string;
  beneficios: string[];
  descripcion: string;
  cta: string;
  textoBoton: string;
  precio: string;
  tiempo: string;
}

export interface ProjectData {
  tipoProyecto: string;
  funcionalidades: string[];
  tiempoEntrega: number;
  presupuesto: number;
}

export async function generateLanding(projectData: ProjectData): Promise<LandingData> {
  try {
    const response = await fetch('/api/generate-landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    // Aquí podrías validar la estructura de data si lo deseas
    return data;
  } catch (error) {
    // Fallback a datos mock si la API falla
    return {
      titulo: `${projectData.tipoProyecto} Profesional Para Tu Empresa`,
      subtitulo: `Desarrollamos tu ${projectData.tipoProyecto.toLowerCase()} en ${projectData.tiempoEntrega} semanas con tecnología de vanguardia`,
      beneficios: [
        'Diseño responsive y moderno',
        'Optimizado para conversiones',
        'Integración con herramientas esenciales',
        'Soporte técnico incluido',
        'Entrega garantizada en tiempo'
      ],
      descripcion: `Tu ${projectData.tipoProyecto.toLowerCase()} incluirá: ${projectData.funcionalidades.join(', ')}. Desarrollado con React, Node.js y las mejores prácticas de la industria.`,
      cta: 'Solicita tu propuesta personalizada',
      textoBoton: 'Iniciar Proyecto',
      precio: `Desde $${projectData.presupuesto.toLocaleString()}`,
      tiempo: `${projectData.tiempoEntrega} semanas`
    };
  }
}
