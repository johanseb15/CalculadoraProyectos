# 📡 API - CalculadoraProyectos

> Backend para la estimación automatizada de proyectos de desarrollo web con IA

---

## 🔐 Autenticación (opcional)

**Endpoint:** `POST /api/auth/login`  
**Descripción:** Inicia sesión y devuelve un JWT

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "secreta"
}
