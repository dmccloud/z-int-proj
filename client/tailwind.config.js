module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "slc-bg": "url('src/assets/images/slc.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
