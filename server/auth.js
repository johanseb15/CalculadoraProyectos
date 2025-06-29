const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.json({ message: 'Usuario registrado', user: { email: user.email, id: user._id } });
  } catch (err) {
    res.status(400).json({ error: 'Registro fallido', details: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Login fallido', details: err.message });
  }
});

module.exports = router;
