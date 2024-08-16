import { colors, nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: 'hsl(270, 59%, 58%)',
        },
      },
    },

  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    prefix: 'next',
    themes: {
      dark: {
        extend: 'dark',
        colors: {
          background: '#090A0B',
        }
      }
    }
  })],
}
