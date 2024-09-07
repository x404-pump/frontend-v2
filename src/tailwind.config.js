import { colors, nextui, commonColors } from '@nextui-org/theme'

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
        primary: {
          DEFAULT: commonColors.purple[400],
          ...commonColors.purple

        }
      },
    },

  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    prefix: 'my',
    themes: {
      dark: {
        extend: 'dark',
        colors: {
          background: '#090A0B',
        }
      },
      light: {
        extend: 'light',
        colors: {
          background: '#F7F8F8',
        }
      }
    }
  })],
}
