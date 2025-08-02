import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/shop/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  // switched manually to modern SCSS complier because Vite in this version uses the old one by default
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});

// https://vitejs.dev/config/
