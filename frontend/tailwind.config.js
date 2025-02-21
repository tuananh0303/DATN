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
        'butonLogin': '#4880FF'
      },
      screens: {
        phone: '768px',
        tables: '992px'
      },
      spacing: {
        '4.5': '18px',
        '76': '29rem',
        '108': '26.75rem',
        '190.75': '47.69rem'
      }
    }
  },
  plugins: []
}