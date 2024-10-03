/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.{js,jsx,ts,tsx}", // Adjust according to your file structure
    "./public/index.html"          // Include your HTML files
  ],
  theme: {
    extend: {
      // Customize your theme here
      colors: {
        primary: '#FDD400',
        secondary: '#303030',
        third: '#DA2F5E'
      },
      fontSize: {
        'xxl': '2rem', // Custom font size example
      },
    },
  },
  plugins: [],
};
