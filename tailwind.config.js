/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        cherry: "#3D0C11",
        cream: "#FFFCF9",
        rust: "#A44A3F",
        gold: "#D4AF37",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Barlow Condensed"', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(61, 12, 17, 0.3)',
      }
    },
  },
  plugins: [],
}
