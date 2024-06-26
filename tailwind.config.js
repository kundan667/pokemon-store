/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24',
      },
      fontFamily: {
        // sans: ['"Open Sans", sans-serif'],
        oswald: ['"Oswald", sans-serif'],
        // montserrat: ['"Montserrat", sans-serif'],
        poppins: ['"Poppins", sans-serif'],
      },
      backgroundImage: {
        cardGradient: 'linear-gradient(to bottom right, #FFA500 55%, #FFFFFF 50%)'
      },
      keyframes: {
        rotate: {
          '0%': {
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)',
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
            '-o-transform': 'rotate(360deg)',
            'transform': 'rotate(360deg)',
          }
        },
        fadeOut: {
          '0%': { opacity: '1', },
          '100%': { opacity: '0', },
        },
      },
      animation: {
        rotate: 'rotate .5s linear infinite',
      },
    },
  },
  plugins: [require('daisyui')],
};
