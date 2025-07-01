// Rutas para estimates
const express = require('express');
const router = express.Router();
const controller = require('./estimate.controller');
const auth = require('../../middleware/auth');

// ...define routes
router.delete('/:id', auth, controller.deleteEstimate);

module.exports = router;
