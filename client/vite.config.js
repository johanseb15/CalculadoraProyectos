import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: false,
    postcss: null
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});