/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',
          black: '#101010',
          yellow: '#FACC15',
          'yellow-hover': '#EAB308',
          'yellow-light': '#FEF9C3',
          'light-grey': '#F5F5F5',
          'text-grey': '#666666',
          'border-grey': '#E5E5E5',
          'dark-card': '#171717',
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 5px 15px -5px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 8px 20px -6px rgba(0, 0, 0, 0.04)',
        'yellow-glow': '0 0 25px -5px rgba(250, 204, 21, 0.4)',
      }
    },
  },
  plugins: [],
}
