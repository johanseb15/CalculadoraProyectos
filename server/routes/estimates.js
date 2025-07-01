const express = require('express');
const Estimate = require('../models/Estimate');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const estimateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 requests por IP
  message: { message: 'Demasiadas solicitudes de estimación, intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * /api/estimates:
 *   post:
 *     summary: Crear nueva estimación
 *     tags: [Estimates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectType
 *               - features
 *               - complexity
 *               - pages
 *             properties:
 *               projectType:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               complexity:
 *                 type: string
 *               pages:
 *                 type: integer
 *               integrations:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalPrice:
 *                 type: number
 *               basePrice:
 *                 type: number
 *               featuresPrice:
 *                 type: number
 *               complexityMultiplier:
 *                 type: number
 *               estimatedWeeks:
 *                 type: number
 *               breakdown:
 *                 type: object
 *     responses:
 *       201:
 *         description: Estimación creada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token requerido o inválido
 *
 *   get:
 *     summary: Listar estimaciones del usuario
 *     tags: [Estimates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estimaciones
 *       401:
 *         description: Token requerido o inválido
 *
 * /api/estimates/{id}:
 *   get:
 *     summary: Obtener detalle de una estimación
 *     tags: [Estimates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de estimación
 *       401:
 *         description: Token requerido o inválido
 *       404:
 *         description: No encontrado
 *
 *   delete:
 *     summary: Eliminar una estimación
 *     tags: [Estimates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estimación eliminada
 *       401:
 *         description: Token requerido o inválido
 *       404:
 *         description: No encontrado
 */

// Crear nueva estimación
router.post('/',
  estimateLimiter,
  auth,
  [
    body('projectType').isString().notEmpty(),
    body('features').isArray(),
    body('complexity').isString().notEmpty(),
    body('pages').isInt({ min: 1 }),
    body('integrations').optional().isArray(),
    body('totalPrice').optional().isNumeric(),
    body('basePrice').optional().isNumeric(),
    body('featuresPrice').optional().isNumeric(),
      const estimate = await Estimate.create({
        projectType: req.body.projectType,
        features: req.body.features,
        complexity: req.body.complexity,
        pages: req.body.pages,
        integrations: req.body.integrations,
        totalPrice: req.body.totalPrice,
        basePrice: req.body.basePrice,
        featuresPrice: req.body.featuresPrice,
        complexityMultiplier: req.body.complexityMultiplier,
        estimatedWeeks: req.body.estimatedWeeks,
        breakdown: req.body.breakdown,
        userId: req.user.userId
      });    body('estimatedWeeks').optional().isNumeric(),
    body('breakdown').optional().isObject(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    try {
      const estimate = await Estimate.create({ ...req.body, userId: req.user.userId });
      res.status(201).json(estimate);
    } catch (e) {
      res.status(500).json({ message: 'Error al guardar estimación', error: e.message });
    }
  }
);

// Listar estimaciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    const estimates = await Estimate.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(estimates);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener estimaciones', error: e.message });
  }
});

// Obtener detalle de una estimación
router.get('/:id', auth, async (req, res) => {
  try {
    const estimate = await Estimate.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!estimate) return res.status(404).json({ message: 'No encontrado' });
    res.json(estimate);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener estimación', error: e.message });
  }
});

// Eliminar estimación
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Estimate.deleteOne({ _id: req.params.id, userId: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Estimación eliminada' });
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar estimación', error: e.message });
  }
});

module.exports = router;
