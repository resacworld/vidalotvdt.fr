module.exports = {
    darkMode: 'class',
    content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    theme: {
      extend: {
        colors: {
          // "light": "rgb(191 219 254)", // blue-200
          // "light-secondary": "rgb(147 197 253)", // blue-300
          
          "light": "rgb(255 255 255)", // blue-200
          "light-secondary": "rgb(230 230 230)", // blue-300
          "dark": "rgb(31 41 55)", // gray-800
          "dark-secondary" : "rgb(55 65 81)" // gray-700
        }
      }
    },
    plugins: [],
  };