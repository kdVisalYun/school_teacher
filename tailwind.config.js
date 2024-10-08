/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/test.html"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        primary: "#00A09B",
      },
    },
  },
  plugins: [],
};
