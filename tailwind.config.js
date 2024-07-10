/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#000080",
        "secondary": "#0000FF",
        "disabled": "rgb(209, 213, 219)",
        "description": "#737373",
        "placeholder": "rgba(156,163,175,255)",
        "linkedin": "#0077B5"
      }
    },
  },
  plugins: [],
}

