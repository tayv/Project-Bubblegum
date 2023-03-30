module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./designSystem/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
