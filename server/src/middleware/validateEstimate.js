// Middleware to validate estimate request body
module.exports = (req, res, next) => {
  const { projectType, complexity, pages } = req.body;
  if (!projectType || typeof projectType !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid or missing projectType' });
  }
  if (complexity && !['Baja', 'Media', 'Alta'].includes(complexity)) {
    return res.status(400).json({ success: false, error: 'Invalid complexity value' });
  }
  if (pages && (typeof pages !== 'number' || pages < 1)) {
    return res.status(400).json({ success: false, error: 'Pages must be a positive number' });
  }
  next();
};
