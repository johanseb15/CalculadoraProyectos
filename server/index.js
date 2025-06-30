const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar el estimate router DRY
const estimateRouter = require('./src/routes/estimate');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));app.use(express.json());

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
});// Manejo de errores
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Algo salió mal!'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 CalculadoraProyectos API v1.0.0`);
});