/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'pulse-custom': 'pulse 1.2s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          'from': {
            transform: 'translateX(-20px)',
            opacity: '0',
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        pulse: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
