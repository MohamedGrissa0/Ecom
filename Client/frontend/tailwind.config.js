module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['ClashDisplay-Regular', 'sans-serif'],
      },
      colors: {
        tomato: '#E50914',
        marigold: '#ffbe0b',
        blackly: '#141414',
        grayly: '#8f9090',
        grenly: '#46d369',
        orangew: '#FF7B54',
        blueciel: '#77ccf0',
        peach: '#fff0db',
      },
    },
  },
  variants: {},
  plugins: [],
};
