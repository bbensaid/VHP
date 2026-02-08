/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        policy: "#1D4ED8",
        economics: "#059669",
        technology: "#4F46E5",
      },
    },
  },
  // ADD THIS SECTION BELOW
  plugins: [
    require('@tailwindcss/typography'),
  ],
};