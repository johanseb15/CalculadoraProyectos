# 💰 CalculadoraProyectos

> **Estimador de costos inteligente para agencias web**

Una herramienta completa para calcular presupuestos de proyectos web de forma automatizada, potenciada por inteligencia artificial y diseñada específicamente para agencias digitales.

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)

## 🎯 Características Principales

- **Estimación Inteligente**: Cálculo automático de costos basado en complejidad del proyecto
- **Interfaz Intuitiva**: Diseño moderno y fácil de usar con React y Tailwind CSS
- **API Robusta**: Backend escalable construido con Node.js y Express
- **Integración de Pagos**: Preparado para Mercado Pago
- **Exportación de Presupuestos**: Genera documentos profesionales en PDF
- **Gestión de Proyectos**: Historial y seguimiento de cotizaciones

## 📁 Estructura del Proyecto

```
CalculadoraProyectos/
├── client/                 # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios API
│   │   └── utils/          # Utilidades
│   ├── public/
│   └── package.json
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Definición de rutas
│   │   ├── middleware/     # Middlewares personalizados
│   │   └── utils/          # Utilidades del servidor
│   └── package.json
├── docs/                   # Documentación adicional
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **npm** (versión 8.x o superior) o **yarn**
- **Git**

```bash
# Verificar versiones
node --version
npm --version
```

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/johanseb15/CalculadoraProyectos.git
cd CalculadoraProyectos
```

2. **Instalar dependencias del servidor**
```bash
cd server
npm install
```

3. **Instalar dependencias del cliente**
```bash
cd ../client
npm install
```

4. **Configurar variables de entorno**

Crear archivo `.env` en la carpeta `server/`:
```bash
# server/.env
PORT=5000
NODE_ENV=development
DB_CONNECTION_STRING=your_database_url
JWT_SECRET=your_jwt_secret_key
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_token
AI_API_KEY=your_ai_service_key
```

Crear archivo `.env` en la carpeta `client/`:
```bash
# client/.env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### Ejecución en Desarrollo

**Opción 1: Ejecutar ambos servicios simultáneamente**

Desde la raíz del proyecto:
```bash
# Instalar concurrently globalmente (solo la primera vez)
npm install -g concurrently

# Ejecutar ambos servicios
npm run dev
```

**Opción 2: Ejecutar servicios por separado**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

La aplicación estará disponible en:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🛠️ Scripts Disponibles

### Scripts del Servidor (server/)
```bash
npm run dev          # Ejecutar en modo desarrollo con nodemon
npm start            # Ejecutar en modo producción
npm run build        # Compilar TypeScript (si aplica)
npm test             # Ejecutar tests
npm run lint         # Verificar código con ESLint
```

### Scripts del Cliente (client/)
```bash
npm start            # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm test             # Ejecutar tests
npm run eject        # Ejectar configuración de Create React App
```

## 🔧 Configuración Detallada

### Base de Datos

Si usas MongoDB:
```bash
# Instalar MongoDB localmente o usar MongoDB Atlas
# Actualizar la variable DB_CONNECTION_STRING en .env
```

Si usas PostgreSQL:
```bash
# Instalar PostgreSQL
# Crear base de datos
createdb calculadora_proyectos

# Actualizar la variable DB_CONNECTION_STRING en .env
DB_CONNECTION_STRING=postgresql://username:password@localhost:5432/calculadora_proyectos
```

### Integración con Mercado Pago

1. Crear cuenta en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Obtener el Access Token
3. Actualizar la variable `MERCADOPAGO_ACCESS_TOKEN` en el archivo `.env`

### Configuración de IA

Para la funcionalidad de estimación inteligente:
1. Configurar API key del servicio de IA (OpenAI, etc.)
2. Actualizar la variable `AI_API_KEY` en el archivo `.env`

## 📱 Uso de la Aplicación

### Crear un Nuevo Presupuesto

1. Accede a la aplicación en tu navegador
2. Haz clic en "Nuevo Presupuesto"
3. Completa el formulario con los detalles del proyecto:
   - Tipo de sitio web
   - Funcionalidades requeridas
   - Diseño personalizado
   - Integraciones necesarias
4. La IA calculará automáticamente el costo estimado
5. Revisa y ajusta el presupuesto si es necesario
6. Exporta el presupuesto en PDF o envíalo por email

### Gestionar Proyectos

- **Dashboard**: Vista general de todos los presupuestos
- **Historial**: Consulta presupuestos anteriores
- **Estadísticas**: Análisis de proyectos y rentabilidad

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests del backend
cd server
npm test

# Tests del frontend
cd client
npm test

# Tests de integración
npm run test:integration
```

### Cobertura de Tests

```bash
# Generar reporte de cobertura
npm run test:coverage
```

## 🚀 Despliegue

### Producción con Docker

```bash
# Construir imágenes
docker-compose build

# Ejecutar en producción
docker-compose up -d
```

### Despliegue Manual

1. **Construir el frontend**
```bash
cd client
npm run build
```

2. **Configurar servidor para producción**
```bash
cd server
npm install --production
NODE_ENV=production npm start
```

### Plataformas Recomendadas

- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Railway, DigitalOcean
- **Base de Datos**: MongoDB Atlas, PostgreSQL en Heroku

## 📚 API Documentation

### Endpoints Principales

```bash
GET    /api/projects          # Obtener todos los proyectos
POST   /api/projects          # Crear nuevo proyecto
GET    /api/projects/:id      # Obtener proyecto específico
PUT    /api/projects/:id      # Actualizar proyecto
DELETE /api/projects/:id      # Eliminar proyecto

POST   /api/calculate         # Calcular presupuesto con IA
POST   /api/export/pdf        # Exportar presupuesto a PDF
POST   /api/payments/create   # Crear pago con Mercado Pago
```

### Ejemplo de Uso de la API

```javascript
// Crear nuevo presupuesto
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    clientName: 'Cliente Ejemplo',
    projectType: 'ecommerce',
    features: ['payment-gateway', 'inventory-management'],
    timeline: '8 weeks'
  })
});
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

### Guías de Contribución

- Seguir las convenciones de código establecidas
- Escribir tests para nuevas funcionalidades
- Actualizar la documentación cuando sea necesario
- Usar mensajes de commit descriptivos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Si tienes algún problema o pregunta:

1. Revisa los [Issues existentes](https://github.com/johanseb15/CalculadoraProyectos/issues)
2. Crea un [nuevo Issue](https://github.com/johanseb15/CalculadoraProyectos/issues/new)
3. Contacta al desarrollador: [johanseb15](https://github.com/johanseb15)

## 🔄 Changelog

### v1.0.0 (Próximamente)
- Calculadora básica de proyectos web
- Interfaz de usuario con React
- API REST con Node.js
- Integración con Mercado Pago
- Exportación a PDF

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**

Desarrollado con ❤️ por [johanseb15](https://github.com/johanseb15)