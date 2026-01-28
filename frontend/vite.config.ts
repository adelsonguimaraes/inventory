import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: true, // Permite acesso externo (Docker)
    port: 5173,
    watch: {
      usePolling: true, // Necessário para o Hot Reload funcionar no Windows/Docker
    },
  },
})