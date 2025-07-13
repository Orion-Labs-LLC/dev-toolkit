import { Config } from "prettier";

const config = {
  // Base formatting rules
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,

  // Quotes configuration
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",

  // Code organization
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",

  // Special formatting
  endOfLine: "lf",
  singleAttributePerLine: true,

  // Framework-specific configurations
  plugins: [
    "@ianvs/prettier-plugin-sort-imports", // Optional import sorting
    "prettier-plugin-tailwindcss", // Should come last
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
} satisfies Config;

export default config;