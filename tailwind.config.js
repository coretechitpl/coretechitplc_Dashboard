/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#050303',
          dark: '#27061c',
          highlight: '#84285b',
          light: '#efedf5',
          alert: '#f4c951'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        inter: ['Inter', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #84285b, 0 0 10px #84285b, 0 0 15px #84285b' },
          '100%': { boxShadow: '0 0 10px #f4c951, 0 0 20px #f4c951, 0 0 30px #f4c951' }
        }
      }
    },
  },
  plugins: [],
};