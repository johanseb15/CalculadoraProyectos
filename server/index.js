const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar routers (corrigiendo rutas)
const authRoutes = require('./routes/auth');
const estimatesRoutes = require('./routes/estimates');
const pdfRoutes = require('./routes/pdf');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));app.use(express.json());

// Swagger config
const { swaggerSpec, swaggerUi } = require('./config/swagger');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'CalculadoraProyectos API funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Usar el router externo para /api/estimate
app.use('/api/auth', authRoutes);
app.use('/api/estimates', estimatesRoutes);
app.use('/api/pdf', pdfRoutes);

// Otros endpoints
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    projects: []
  });
});

app.post('/api/projects', (req, res) => {
  const project = req.body;
  console.log('💾 Guardando proyecto:', project);

  res.status(501).json({
    success: false,
    error: 'Project persistence not implemented'
  });
});

// Conexión a MongoDB si no está ya
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/calculadora', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });
}
// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Iniciar servidor solo si no está en test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 CalculadoraProyectos API v1.0.0`);
  });
}

module.exports = app;