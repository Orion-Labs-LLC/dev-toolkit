import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.mts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
});