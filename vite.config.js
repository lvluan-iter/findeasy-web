import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'globalThis'
  },
  server: {
    port: 3000, 
    open: true,
    proxy: {
      '/api': {
        target: 'https://roombooking-fa3a.onrender.com',
        changeOrigin: true
      }
    }
  }
});