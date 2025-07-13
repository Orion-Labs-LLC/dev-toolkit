import baseConfig from "./base.mts";

const config = {
  ...baseConfig,
  "compilerOptions": {
    ...baseConfig.compilerOptions,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    ".next/types/**/*.ts",
    "types/**/*"
  ]
};

export default config;