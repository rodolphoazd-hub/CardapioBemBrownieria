/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans':['Montserrat','sans-serif']

    },
    extend: {
     backgroundImage:{
      "home":"url('/assets/bg.jpg')"
     } 
    },
  },
  plugins: [],
}

