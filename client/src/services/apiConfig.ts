// src/services/apiConfig.ts

// Prefer `??` so empty strings are flagged, and switch to a Vite-style key.
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  'http://localhost:3001/api';