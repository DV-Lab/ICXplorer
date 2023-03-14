const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#000",
        secondary: "#f5f6f8",
        lightText: "rgba(39,46,54,0.9)",
        darkText: "#b2b2b2",
      },
    },
    fontFamily: {
      code: ["Fira Code", "monospace"],
    },
  },
  plugins: [],
});
