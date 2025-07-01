const jwt = require('jsonwebtoken');
-const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';
+const JWT_SECRET = process.env.JWT_SECRET;
+
+if (!JWT_SECRET) {
+  throw new Error('JWT_SECRET environment variable is required');
+}
module.exports = function(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error('JWT verification error:', e);
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Por favor, inicia sesión de nuevo.' });
    } else if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido. Autenticación fallida.' });
    } else {
      return res.status(401).json({ message: 'Error de autenticación.' });
    }
  }};
