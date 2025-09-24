/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { muted: { foreground: '#6b7280' } }
    },
  },
  plugins: [],
}