module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      keyframes: { drift: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(4%,6%) scale(1.15)" } } },
      animation: { drift: "drift 16s ease-in-out infinite" },
    },
  },
  plugins: [],
};
