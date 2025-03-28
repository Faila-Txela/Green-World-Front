
/** @type {import('tailwindcss').Config} */                           
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ["./index.html", 
    "./src/**/*.{js,ts,jsx,tsx,html}"],

  theme: {
    extend: {
      animation: {
        "slide-in": "slideIn .5 ease-out",
      },
      keyframes:{
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opcaity: "0"},
          '100%': { transform: 'translateY(0)', opcaity: "1"}
        }
      },
      colors: {
        'global-color-primary': '#00160E',
        'global-color-secondary': '#006943',
        'global-color-three': '#007f5b'
      },
      fontSize: {
        'title': '40px',
        'body': '16px',
      },
      fontFamily: {
        Quicksand: ['Quicksand', 'serif']
      }
    },
  },
  plugins: [
    tailwindScrollbarHide,
    function ({ addUtilities }) {
      const newUtilities = {
        'text-shadow-black': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 5)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ], 
}