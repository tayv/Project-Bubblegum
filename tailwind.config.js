const colors = require("tailwindcss/colors")
// import colors from 'tailwindcss/colors'

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./designSystem/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cta: colors.sky, // cta buttons
        link: colors.violet, // links
        accent: colors.lime, // focus rings, etc.
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
