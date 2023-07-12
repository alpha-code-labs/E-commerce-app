/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0A66C2',
        'custom-twitter': '#00ACEE',
        'custom-instagram': '#E4405F',
        'color-1':'#0C133B',
        'color-2':'#32D3E7',
        'color-3':'#EBF4F1',
        'color-4':'#D1E0DB'
      },
    },
  },
  plugins: [],
}
