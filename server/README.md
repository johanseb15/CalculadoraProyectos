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

Consulta la documentación Swagger para detalles de cada endpoint.
