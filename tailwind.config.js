module.exports = {
  mode: "jit",
  purge: [
    "./views/**/*.go",
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('daisyui')],
}
