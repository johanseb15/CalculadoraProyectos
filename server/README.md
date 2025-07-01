# API de Estimaciones SaaS

## Descripción
Backend Express para gestión y cálculo de estimaciones de proyectos SaaS. Incluye autenticación JWT, validación, rate limiting y documentación Swagger.

## Instalación

```bash
npm install
```

## Variables de Entorno

Crea un archivo `.env` en la raíz de `server/` con:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/estimates
JWT_SECRET=tu_clave_secreta
NODE_ENV=development
```

## Scripts

- `npm start` — Inicia el servidor
- `npm run dev` — Inicia en modo desarrollo (con nodemon)
- `npm test` — Ejecuta pruebas (si están configuradas)

## Uso

- La API principal está en `/api/estimates` (ver Swagger en `/api-docs`)
- Requiere autenticación JWT para la mayoría de endpoints

## Testing

- Usa Jest o Mocha para unit tests y Supertest para integración
- Ejemplo de test de endpoint:

```js
const request = require('supertest');
const app = require('../index');

describe('GET /api/estimates', () => {
  it('requiere autenticación', async () => {
    const res = await request(app).get('/api/estimates');
    expect(res.statusCode).toBe(401);
  });
});
```

## Seguridad y Buenas Prácticas

- Validación de datos con `express-validator`
- Rate limiting con `express-rate-limit`
- Autenticación JWT
- CORS y Helmet recomendados para producción

## Logging y Manejo de Errores

- Usa un middleware global de errores (ver ejemplo abajo)
- Integra un logger como `winston` para producción

```js
// server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
};
```

En `index.js`:
```js
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
```

---

## Estructura Modular Recomendada

```
server/
  features/
    estimates/
      estimates.routes.js
      estimates.controller.js
      estimates.service.js
      estimates.test.js
    auth/
      auth.routes.js
      auth.controller.js
      auth.service.js
  middleware/
  models/
  config/
  index.js
```

- Separa lógica de negocio en servicios (`.service.js`) y controladores (`.controller.js`).
- Agrupa por feature/dominio para escalar mejor.

## Ejemplo de Servicio Modular

```js
// features/estimates/estimates.service.js
const Estimate = require('../../models/Estimate');

exports.createEstimate = async (data) => {
  return Estimate.create(data);
};

exports.getEstimatesByUser = async (userId) => {
  return Estimate.find({ userId }).sort({ createdAt: -1 });
};
```

## CI/CD: Ejemplo de Workflow GitHub Actions

Crea `.github/workflows/nodejs.yml`:

```yaml
name: Node.js CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js (LTS Jod)
        uses: actions/setup-node@v4
        with:
          node-version: '22.16.0'
      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-
      - run: npm install
      - run: npm test
## Validación Frontend (React)

```js
// Ejemplo de validación de email
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
<input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  className={isValid ? '' : 'border-red-500'}
/>
{!isValid && <span>Email inválido</span>}
```

## Dark Mode con Tailwind

Agrega `darkMode: 'class'` en `tailwind.config.js` y alterna la clase `dark` en `<body>`:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

```js
// En tu componente raíz
<button onClick={() => document.body.classList.toggle('dark')}>Toggle Dark Mode</button>
```

## Planificación MVP v2

1. Elige 1-2 features de alto valor (ej: historial de estimaciones, exportar a Excel, colaboración multiusuario).
2. Prototipa en Figma o wireframe rápido.
3. Define endpoints y flujos mínimos.
4. Implementa primero la lógica de backend y luego la UI.

---

Consulta la documentación Swagger para detalles de cada endpoint.
