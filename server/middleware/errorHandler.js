// server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  // Puedes mejorar esto usando winston/pino para logs en producción
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
};
