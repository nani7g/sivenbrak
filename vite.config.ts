
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env': process.env
  }
});
