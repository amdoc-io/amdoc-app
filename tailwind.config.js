/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(136, 85, 255)",
        "disabled": "rgb(209, 213, 219)"
      }
    },
  },
  plugins: [],
}

