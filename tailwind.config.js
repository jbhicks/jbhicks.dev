module.exports = {
  mode: "jit",
  purge: [
    "./views/**/*.go",
    "./public/**/*.html", // Add other paths where you use the classes
    "./handlers/**/*.go",
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('daisyui')],
}
