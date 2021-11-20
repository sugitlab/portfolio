module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./hooks/**/*.{ts,tsx}",
    "./resources/**/*.{ts,tsx}",
  ],
  darkMode: "media", // 't/f' or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
