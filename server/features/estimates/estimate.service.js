// Lógica de negocio para estimates

class NotImplementedError extends Error {
  constructor(message) {
    super(message || 'Not implemented');
    this.name = 'NotImplementedError';
  }
}

module.exports = {
  createEstimate: async function(/*data*/) {
    throw new NotImplementedError('createEstimate is not implemented yet');
  },
  getEstimateById: async function(/*id*/) {
    throw new NotImplementedError('getEstimateById is not implemented yet');
  }
};
