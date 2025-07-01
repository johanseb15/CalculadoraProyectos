const express = require('express');
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const Estimate = require('../models/Estimate');
const User = require('../models/User');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const {
  PDF_TITLE,
  PDF_CLIENT_LABEL,
  PDF_DATE_LABEL,
  PDF_PROJECT_SUMMARY,
  PDF_PROJECT_TYPE,
  PDF_COMPLEXITY,
  PDF_PAGES,
  PDF_INTEGRATIONS,
  PDF_FEATURES,
  PDF_COST_BREAKDOWN,
  PDF_BASE,
  PDF_FEATURES_PRICE,
  PDF_COMPLEXITY_MULTIPLIER,
  PDF_ESTIMATED_TIME,
  PDF_TOTAL,
  PDF_CURRENCY,
  PDF_WEEKS,
  PDF_NA
} = require('../constants/pdf');
const router = express.Router();

const pdfLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 requests por IP
  message: { message: 'Demasiadas solicitudes de PDF, intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/estimate/:id/pdf', auth, pdfLimiter, async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id).populate('user', 'name email');
    if (!estimate) {
      return res.status(404).json({ message: 'Estimación no encontrada' });
    }
    const user = estimate.user;

    const doc = new PDFDocument();

    // Handle PDF generation errors
    doc.on('error', (err) => {
      console.error('PDF generation error:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error al generar PDF', error: err.message });
      }
    });

    doc.pipe(res);
    // Header
    doc.fontSize(22).text(PDF_TITLE, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`${PDF_CLIENT_LABEL}: ${user.name || user.email}`);
    doc.text(`${PDF_DATE_LABEL}: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    // Estimación
    doc.fontSize(16).text(PDF_PROJECT_SUMMARY, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${PDF_PROJECT_TYPE}: ${estimate.projectType}`);
    doc.text(`${PDF_COMPLEXITY}: ${estimate.complexity}`);
    doc.text(`${PDF_PAGES}: ${estimate.pages}`);
    doc.text(`${PDF_INTEGRATIONS}: ${(estimate.integrations || []).join(', ') || PDF_NA}`);
    doc.text(`${PDF_FEATURES}: ${(estimate.features || []).join(', ') || PDF_NA}`);
    doc.moveDown();
    doc.fontSize(16).text(PDF_COST_BREAKDOWN, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`${PDF_BASE}: ${PDF_CURRENCY}${estimate.basePrice}`);
    doc.text(`${PDF_FEATURES_PRICE}: ${PDF_CURRENCY}${estimate.featuresPrice}`);
    doc.text(`${PDF_COMPLEXITY_MULTIPLIER}: x${estimate.complexityMultiplier}`);
    doc.text(`${PDF_ESTIMATED_TIME}: ${estimate.estimatedWeeks} ${PDF_WEEKS}`);
    doc.moveDown();
    doc.fontSize(14).text(`${PDF_TOTAL}: ${PDF_CURRENCY}${estimate.totalPrice}`, { align: 'right' });
    doc.end();
  } catch (e) {
    res.status(500).json({ message: 'Error al generar PDF', error: e.message });
  }
});

module.exports = router;
