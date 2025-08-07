import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import VueRouter from 'unplugin-vue-router/vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

const routerConfig = {
  routesFolder: 'src/pages',
  dts: 'src/types/typed-router.d.ts',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(routerConfig), vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
