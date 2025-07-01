const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El usuario ya existe
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales inválidas
 */

// Registro
router.post('/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').optional().isString().trim().isLength({ min: 2 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    try {
      const { email, password, name } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'El usuario ya existe' });
      const user = await User.create({ email, password, name });
      res.status(201).json({ message: 'Usuario registrado', user: { email: user.email, name: user.name, _id: user._id } });
    } catch (e) {
      res.status(500).json({ message: 'Error en el registro', error: e.message });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña requerida')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
      const valid = await user.comparePassword(password);
      if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { email: user.email, name: user.name, _id: user._id } });
    } catch (e) {
      res.status(500).json({ message: 'Error en el login', error: e.message });
    }
  }
);

module.exports = router;
