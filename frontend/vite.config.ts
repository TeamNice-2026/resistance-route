import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Native Windows development: listen locally, not on the school network.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: { usePolling: true },
    // The old Docker hostname "backend" is not resolvable on Windows.
    proxy: { '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true } },
  },
})
