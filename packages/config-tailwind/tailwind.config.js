const colors = require("tailwindcss/colors")
// import colors from 'tailwindcss/colors'

module.exports = {
  content: [
    "../../apps/bubblegum/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{html,js,ts,jsx,tsx, mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.stone,
        cta: colors.indigo, // cta buttons
        link: colors.violet, // links
        accent: colors.lime, // focus rings, etc.
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
