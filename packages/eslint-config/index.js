import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import jsxAccessibilityPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export default tseslint.config(
  //base
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  //react
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxAccessibilityPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxAccessibilityPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  //next
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules, //enforce nextjs perf optimization
    },
  },

  //tailwind
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...tailwindPlugin.configs.recommended.rules,
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"], //includes tailwind in these functions for linting
      },
    },
  },

  //Typescript
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        //Exclude underscore for ingored vars
        { 
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": "off", //annoying in JSX
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false, //also annoying in JSX
          },
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: [
      "**/*.config.{js,mjs,ts}",
      "**/tailwind.config.{js,ts}",
      "**/next.config.{js,mjs}",
    ],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    ignores: [
      ".eslintrc.js",
      ".eslintrc.mjs", 
      ".prettierrc.js",
      ".prettierrc.mjs",
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      "out/**",
      "coverage/**",
      ".turbo/**",
      "eslint.config.mjs",
      "*.min.js",
    ],
  }
);