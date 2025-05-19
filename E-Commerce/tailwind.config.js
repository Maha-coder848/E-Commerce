const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",         // Include root HTML file
    "./shop.html", 
    "./contact.html", 
    "./blog.html", 
    "./cart.html",
    "./checkout.html",
    
    "./src/**/*.{html,js}", // Include all HTML & JS inside src folder
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        rose: colors.rose,
        pink: colors.pink,
        gray: colors.gray,
      },
    },
  },
  plugins: [],
};
