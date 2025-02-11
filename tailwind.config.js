/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html"],
  theme: {
    extend: {
      colors: {
        "theme-color-50": "#fff1f2",
        "theme-color-100": "#ffe4e6",
        "theme-color-200": "#fecdd3",
        "theme-color-300": "#fda4af",
        "theme-color-400": "#818cf8",
        "theme-color-500": "#1e40af",
        "theme-color-600": "#1e3a8a",
        "theme-color-700": "#be123c",
        "theme-color-800": "#9f1239",
        "theme-color-900": "#881337",
        "theme-color-950": "#4c0519",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
