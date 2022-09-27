import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lingjie/',
  build: {
    outDir: './dist/page',
    lib: {
      entry: './src/page.ts',
      name: 'LingjiePage',
      formats: ['umd'],
      fileName: 'lingjie-page',
    },
  },
});
