// client/.eslintrc.js
export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'tailwindcss'],
  rules: {
    // Personalizá tus reglas si querés
    'react/react-in-jsx-scope': 'off', // no necesario en React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
