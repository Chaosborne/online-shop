import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        app: resolve(__dirname, 'app.html'),
      },
      output: {
        entryFileNames: chunkInfo => {
          return chunkInfo.name === 'main' ? '[name].js' : 'app/[name].js';
        },
        assetFileNames: chunkInfo => {
          return chunkInfo.name === 'main' ? 'css/[name][extname]' : 'app/[name][extname]';
        },
      },
    },
  },
});

// https://vitejs.dev/config/
