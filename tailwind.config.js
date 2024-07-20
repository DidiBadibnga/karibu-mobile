/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A7E1", // Custom primary color
          light: "#e4ebfa", // Light mode variant
          dark: "#0f4fd", // Dark mode variant
          extra: "#23262d", // Additional color
        },
      },
    },
  },
  plugins: [],
};
