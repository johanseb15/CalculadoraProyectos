const Estimate = require('./estimate.model');

// Controlador para estimates
module.exports = {
  // ...existing code...
  async deleteEstimate(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Estimate.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Estimación no encontrada' });
      }
      res.json({ message: 'Estimación eliminada' });
    } catch (e) {
      res.status(500).json({ message: 'Error al eliminar estimación' });
    }
  },
  // ...handlers (getEstimates, createEstimate, etc.)
};
