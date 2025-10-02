import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5174,
    host: 'localhost', // ← Zmeň z '0.0.0.0' na 'localhost'
    strictPort: false, // ← Ak je port obsadený, nájde iný
    hmr: {
      overlay: true,
    },
  },
});