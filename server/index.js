const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar el estimate router DRY
const estimateRouter = require('./src/routes/estimate');
const authRoutes = require('./src/routes/auth');
const estimatesRoutes = require('./src/routes/estimates');
const pdfRoutes = require('./routes/pdf');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Calculadora Proyectos API',
      version: '1.0.0',
      description: 'API para estimación de proyectos web SaaS con autenticación JWT',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Desarrollo local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
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
app.use('/api', estimateRouter);
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
  });
}

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  const logger = require('./src/config/logger');
  logger.error(`Unhandled error: ${err.stack}`);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 CalculadoraProyectos API v1.0.0`);
});