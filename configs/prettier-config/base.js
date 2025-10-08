/** @type { import("prettier").Config } */
export const config = {
  arrowParens: 'always',
  bracketSameLine: false,
  embeddedLanguageFormatting: 'auto',
  experimentalOperatorPosition: 'start',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'strict',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@jhxdev/(.*)$',
    '^jhx',
    '',
    '^@/(.*)$',
    '^[./]',
  ],
  overrides: [{
    files: '**/*.{ts,tsx,js,jsx,json,md}',
  }],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 110,
  proseWrap: 'always',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'all',
}
