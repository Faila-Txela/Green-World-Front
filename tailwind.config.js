
/** @type {import('tailwindcss').Config} */                           
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ["./index.html", 
    "./src/**/*.{js,ts,jsx,tsx,html}"],

  theme: {
    extend: {
      backgroundImage: {
        bannerImg: "url('/mine.png')",
        garbageImage: "url('/garbageImage.jpg')"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        marquee: "marquee 14s linear infinite",
      },
      colors: {
        'primary': '#117923',
      },
      fontSize: {
        'title': '40px',
        'body': '16px',
      },
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif']
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