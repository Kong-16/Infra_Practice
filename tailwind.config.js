/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html"],
  theme: {
    extend: {
      colors: {
        "theme-color-400": "#818cf8",
        "theme-color-500": "#1e40af",
        "theme-color-600": "#1e3a8a",
        "theme-color-700": "#be123c",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
