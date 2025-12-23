/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // These are your semantic names. Change the HEX here to update the site.
        policy: "#1D4ED8", // Blue-700
        economics: "#059669", // Green-600
        technology: "#4F46E5", // Indigo-600
      },
    },
  },
  plugins: [],
};
