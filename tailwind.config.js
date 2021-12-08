module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        chartGray: { default: "#17181e" },
        chartLightGray: { default: "#8b8b8e" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
