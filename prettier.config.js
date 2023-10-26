module.exports = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  tailwindFunctions: ['clsx'],
  organizeImportsSkipDestructiveCodeActions: true,
}
