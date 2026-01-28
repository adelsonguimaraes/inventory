import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acesso externo (Docker)
    port: 5173,
    watch: {
      usePolling: true, // Necessário para o Hot Reload funcionar no Windows/Docker
    },
  },
})