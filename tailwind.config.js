module.exports = {
  purge: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./hooks/**/*.{ts,tsx}",
    "./resources/**/*.{ts,tsx}",
  ],
  darkMode: "class", // 't/f' or 'media' or 'class'
  theme: {
    minWidth: {
      "mw": "4rem",
      "chip": "8rem",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
