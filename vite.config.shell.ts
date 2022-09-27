import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lingjie/',
  build: {
    outDir: './dist/shell',
    lib: {
      entry: './src/index.ts',
      name: 'LingjieShell',
      formats: ['umd'],
      fileName: 'lingjie-shell',
    },
  },
});
