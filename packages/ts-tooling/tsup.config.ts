import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.mts',
    'src/eslint/index.mts',
    'src/eslint/base.mts',
    'src/eslint/react.mts',
    'src/eslint/next.mts',
    'src/prettier.mts',
    'src/tsconfig/index.mts',
    'src/tsconfig/base.mts',
    'src/tsconfig/next.mts'
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2022',
  splitting: false,
  sourcemap: false,
  minify: false,
  outExtension: () => ({ js: '.mjs' })
})