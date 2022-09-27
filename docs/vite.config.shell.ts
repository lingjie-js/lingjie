import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import VitePluginHtmlEnv from 'vite-plugin-html-env'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const lingjieShellPath = env.VITE_LINGJIE_SHELL_PATH
  return {
    base: lingjieShellPath,
    plugins: [
      reactRefresh(),
      VitePluginHtmlEnv(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    ],
    build: {
      outDir: `./dist/lingjie`,
      rollupOptions: {
        input: [resolve(__dirname, 'index.html')],
      },
      // minify: false,
    },
  }
});
