/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        mainBGColor: '#0F172A'
      },
    },
  },
  plugins: [],
}
