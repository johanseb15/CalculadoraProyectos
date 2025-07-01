const express = require('express');
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const Estimate = require('../models/Estimate');
const User = require('../models/User');
const router = express.Router();

// POST /api/pdf/estimate/:id
router.post('/estimate/:id', auth, async (req, res) => {
  try {
    const estimate = await Estimate.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!estimate) return res.status(404).json({ message: 'Estimación no encontrada' });
    const user = await User.findById(req.user.userId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=estimacion.pdf');
    const doc = new PDFDocument();
    doc.pipe(res);
    // Header
    doc.fontSize(22).text('Propuesta de Estimación', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Cliente: ${user.name || user.email}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    // Estimación
    doc.fontSize(16).text('Resumen de Proyecto', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Tipo de proyecto: ${estimate.projectType}`);
    doc.text(`Complejidad: ${estimate.complexity}`);
    doc.text(`Páginas: ${estimate.pages}`);
    doc.text(`Integraciones: ${(estimate.integrations || []).join(', ') || 'N/A'}`);
    doc.text(`Características: ${(estimate.features || []).join(', ') || 'N/A'}`);
    doc.moveDown();
    doc.fontSize(16).text('Desglose de Costos', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Base: $${estimate.basePrice}`);
    doc.text(`Características: $${estimate.featuresPrice}`);
    doc.text(`Complejidad: x${estimate.complexityMultiplier}`);
    doc.text(`Tiempo estimado: ${estimate.estimatedWeeks} semanas`);
    doc.moveDown();
    doc.fontSize(14).text(`Total estimado: $${estimate.totalPrice}`, { align: 'right' });
    doc.end();
  } catch (e) {
    res.status(500).json({ message: 'Error al generar PDF', error: e.message });
  }
});

module.exports = router;
