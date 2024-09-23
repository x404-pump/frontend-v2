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
          ...commonColors.purpl
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
          background: '#121212',
          focus: commonColors.purple[400],
          foreground: {
            "50": "#1B1B1B",
            "100": "#27272A",
            "200": "#2E2E2E",
            "300": "#404040",
            "400": "#525252",
            "500": "#646464",
            "500": "#898989",
            "700": "#ADADAD",
            "800": "#D1D1D1",
            "900": "#F6F6F6",
          }
        }
      },
      light: {
        extend: 'light',
        colors: {
          focus: commonColors.purple[400],
          background: '#F7F8F8',
        }
      }
    }
  })],
}
