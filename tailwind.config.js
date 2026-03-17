module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./hooks/**/*.{ts,tsx}",
    "./resources/**/*.{ts,tsx}",
  ],
  theme: {
    minWidth: {
      "mw": "4rem",
      "chip": "8rem",
    },
    extend: {
      colors: {
        sg: {
          /* Primitives */
          "gray-50":  "#F5F7F9",
          "gray-100": "#E9EEF2",
          "gray-200": "#D0D9E0",
          "gray-300": "#A8B8C4",
          "gray-400": "#7E96A5",
          "gray-500": "#5A7485",
          "gray-600": "#3E5A6B",
          "gray-700": "#2A3F4D",
          "gray-950": "#0D0D0D",
          "blue-100": "#D8ECF7",
          "blue-300": "#91C5E7",
          "blue-400": "#71B1D9",
          "blue-500": "#4E97C5",
          "blue-600": "#3278A4",
          "blue-700": "#1F5A80",
          "green-100": "#EDF0CB",
          "green-400": "#98A62D",
          "green-600": "#5D6519",
          "lime-50":  "#F7FCC0",
          "lime-100": "#EEF97E",
          "lime-200": "#DEF249",
          "lime-300": "#C8DC1E",
          /* Dark mode backgrounds */
          "dark-base":    "#0F1518",
          "dark-surface": "#171F24",
          "dark-subtle":  "#1E282E",
          "dark-muted":   "#2A3740",
          /* Semantic aliases (light) */
          "base":    "#F5F7F9",
          "surface": "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["'Space Mono'", "'Courier New'", "monospace"],
        body: ["'Zen Kaku Gothic New'", "'Hiragino Kaku Gothic ProN'", "'Yu Gothic'", "sans-serif"],
        accent: ["'Grape Nuts'", "cursive"],
        mono: ["'Space Mono'", "'Courier New'", "monospace"],
      },
      fontSize: {
        "sg-xs":   ["0.6875rem", { lineHeight: "1.5" }],
        "sg-sm":   ["0.8125rem", { lineHeight: "1.5" }],
        "sg-base": ["0.9375rem", { lineHeight: "1.5" }],
        "sg-md":   ["1.0625rem", { lineHeight: "1.5" }],
        "sg-lg":   ["1.25rem",   { lineHeight: "1.35" }],
        "sg-xl":   ["1.5rem",    { lineHeight: "1.35" }],
        "sg-2xl":  ["1.875rem",  { lineHeight: "1.2" }],
        "sg-3xl":  ["2.25rem",   { lineHeight: "1.2" }],
        "sg-4xl":  ["3rem",      { lineHeight: "1.1" }],
        "sg-5xl":  ["3.75rem",   { lineHeight: "1.1" }],
      },
      borderRadius: {
        "sg-sm": "4px",
        "sg-md": "8px",
        "sg-lg": "12px",
      },
      boxShadow: {
        "sg-sm": "0 2px 6px rgba(13,13,13,0.08), 0 1px 2px rgba(13,13,13,0.04)",
        "sg-md": "0 4px 16px rgba(13,13,13,0.10), 0 2px 4px rgba(13,13,13,0.06)",
        "sg-lg": "0 8px 32px rgba(13,13,13,0.12), 0 4px 8px rgba(13,13,13,0.08)",
        "sg-glow-primary": "0 0 24px rgba(113,177,217,0.35)", // blue glow for interactive elements
        "sg-glow-accent": "0 0 24px rgba(222,242,73,0.45)",   // lime glow for accent/hover states
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
