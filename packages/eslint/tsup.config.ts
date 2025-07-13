import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.mts', 'src/base.mts', 'src/react.mts', 'src/next.mts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2022',
  splitting: false,
  sourcemap: false,
  minify: false,
  outExtension: () => ({ js: '.mjs' })
})