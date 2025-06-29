const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

function generateEstimatePDF(estimate, projectData, teamData) {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(20).text('Estimación de Proyecto', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Tipo de Proyecto: ${projectData.type}`);
  doc.text(`Complejidad: ${projectData.complexity}`);
  doc.text(`Funcionalidades: ${(projectData.features || []).join(', ')}`);
  doc.text(`Horas Totales: ${estimate.hours}`);
  doc.text(`Costo Estimado: $${estimate.costARS || estimate.costoTotal}`);
  doc.text(`Tiempo de Desarrollo: ${estimate.timeWeeks || estimate.tiempoDesarrollo}`);
  doc.moveDown();
  doc.text('---');
  doc.text('Gracias por usar CalculadoraProyectos');
  doc.end();
  return doc;
}

module.exports = { generateEstimatePDF };
