import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import fg from 'fast-glob';
import VitePluginHtmlEnv from 'vite-plugin-html-env'

const entries = fg.sync('docs/**/*.html', {
  cwd: __dirname,
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const docsPath = env.VITE_DOCS_PATH
  return {
    base: docsPath,
    plugins: [
      reactRefresh(),
      VitePluginHtmlEnv(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    ],
    publicDir: "./assets",
    build: {
      sourcemap: true,
      outDir: './dist/page',
      rollupOptions: {
        input: entries,
      },
      chunkSizeWarningLimit: 1024,
      // minify: false,
    },
  }
});
