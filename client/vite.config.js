export default defineConfig({
  plugins: [React()],
  css: {
    modules: false, // Si no usas CSS Modules
    postcss: null   // Si no usas PostCSS
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});