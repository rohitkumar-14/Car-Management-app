import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to your backend running on port 5000
      '/api': {
        target: 'http://localhost:5000', // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the URL
      },
    },
  },
});
