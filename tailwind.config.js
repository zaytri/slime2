const { fontFamily } = require('tailwindcss/defaultTheme')
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grandstander: ['Grandstander', ...fontFamily.sans],
        fredoka: ['Fredoka', ...fontFamily.sans],
        radiocanada: ['Radio Canada', ...fontFamily.sans]
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, matchUtilities, theme }) => {
      /**
       * text-shadow utilities
       */
      addUtilities({
        '.text-shadow': {
          'text-shadow': `var(--tw-text-shadow-x-offset, 0) var(--tw-text-shadow-y-offset, 0) var(--tw-text-shadow-blur,) var(--tw-text-shadow-color,)`,
        },
      })

      // text-shadow color
      matchUtilities(
        {
          'text-shadow-c': value => ({
            '--tw-text-shadow-color': value,
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: ['color'],
        },
      )

      // text-shadow offsets
      matchUtilities(
        {
          'text-shadow-x': value => ({
            '--tw-text-shadow-x-offset': value,
          }),
          'text-shadow-y': value => ({
            '--tw-text-shadow-y-offset': value,
          }),
        },
        { values: theme('spacing'), supportsNegativeValues: true },
      )

      // text-shadow blur
      matchUtilities(
        {
          'text-shadow-b': value => ({
            '--tw-text-shadow-blur': value,
          }),
        },
        { values: theme('spacing') },
      )

      /**
       * drop-shadow utilities
       */
      addUtilities({
        '.drop-shadow': {
          filter: `drop-shadow(var(--tw-drop-shadow-x-offset, 0) var(--tw-drop-shadow-y-offset, 0) var(--tw-drop-shadow-blur,) var(--tw-drop-shadow-color,))`,
        },
      })

      // drop-shadow color
      matchUtilities(
        {
          'drop-shadow-c': value => ({
            '--tw-drop-shadow-color': value,
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: ['color'],
        },
      )

      // drop-shadow offsets
      matchUtilities(
        {
          'drop-shadow-x': value => ({
            '--tw-drop-shadow-x-offset': value,
          }),
          'drop-shadow-y': value => ({
            '--tw-drop-shadow-y-offset': value,
          }),
        },
        { values: theme('spacing'), supportsNegativeValues: true },
      )

      // drop-shadow blur
      matchUtilities(
        {
          'drop-shadow-b': value => ({
            '--tw-drop-shadow-blur': value,
          }),
        },
        { values: theme('spacing') },
      )
    }),
  ],
}
