/* eslint-env node */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary': "#5f6fff"
      }
    },
  },
  plugins: [],
}