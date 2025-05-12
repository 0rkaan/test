/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'utalca-red': '#C1121F',
        'utalca-red-dark': '#A30F1A',
        'utalca-gray': '#3D3D3D',
        'utalca-light-gray': '#F5F5F5',
        primary: {
          DEFAULT: '#C1121F',
          dark: '#A10E1A',
          light: '#D32D3A',
        },
        utalca: {
          red: '#C1121F',
          gray: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
