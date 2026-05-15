/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0c0c0e",
          light: "#16161a",
        },
        "clinical-white": "#ffffff",
        medical: {
          DEFAULT: "#1e4d6b",
          light: "#2a6a94",
        },
        gold: {
          DEFAULT: "#c4a35a",
          light: "#d4b872",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};
