/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'main': ['Roboto', 'sans-serif']
      },
      colors: {
        'inputField': '#F1F4F9',
        'butonLogin': '#4880FF',
        'footerColor': '#2C3E50'
      },
      screens: {
        phone: '768px',
        tables: '992px'
      },
      spacing: {
        '4.5': '18px',
        '76': '19rem',
        '108': '26.75rem',
        '190.75': '47.69rem'
      }
    }
  },
  plugins: []
}