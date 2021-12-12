const colors = require('tailwindcss/colors');

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
        "error-bg": "#FFB7B2",
        "info": "#008cff",
        "info-bg": "#B2DCFF",
        "warning": "#ffb300",
        "warning-bg": "#FFE8B2",

        orange: colors.orange,
        teal: colors.teal,
        lime: colors.lime,
        violet: colors.violet,
        stone: colors.stone,
        slate: colors.slate,
        emerald: colors.emerald
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        "pacifico": ['Pacifico', 'sans-serif']
      },
      height: {
        "map": "40rem",
      },
      spacing: {
        "76": "19rem",
        "192": "48rem",
        "66": "16.5rem"
      },
      maxWidth: {
        "xxs": "14rem",
        "8xl": "88rem",
        "9xl": "96rem",
        "1/2": "50%"
      },
    },
    minWidth: {
      "400": "400px" 
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover'],
      textColor: ['group-hover'],
      visibility: ['group-hover'],
      borderColor: ['group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
