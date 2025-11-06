/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./styles/**/*.{html,js,css}",
    "./script.js",
  ],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.jpg')",
      },
    },
  },
  plugins: [],
}
