module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#0F85FA",
        "secondary": "#BDDEFF",
        "dark-gray": "#333333",
        "light-gray": "#FAFAFA",

        "error": "#FF1100",
        "info": "#008cff",
        "warning": "#ffb300"
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        "pacifico": ['Pacifico', 'sans-serif']
      },
    },
    minWidth: {
      "400": "400px" 
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover']
    },
  },
  plugins: [],
}
