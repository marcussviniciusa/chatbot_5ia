/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#ececf1',
          200: '#d9d9e3',
          300: '#c5c5d2',
          400: '#a0a0b8',
          500: '#8e8ea0',
          600: '#6e6e80',
          700: '#4a4a5c',
          800: '#2d2d3a',
          900: '#1f1f28',
          950: '#18181d',
        },
      },
    },
  },
  plugins: [],
};