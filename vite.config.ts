import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/security': {
        target: 'http://138.68.2.13:9100',
        changeOrigin: true,
      },
      '/api/clientes': {
        target: 'http://138.68.2.13:8082',
        changeOrigin: true,
      },
      '/api/vehiculos': {
        target: 'http://138.68.2.13:8083',
        changeOrigin: true,
      },
      '/api/modelos': {
        target: 'http://138.68.2.13:8083',
        changeOrigin: true,
      },
      '/api/marcas': {
        target: 'http://138.68.2.13:8083',
        changeOrigin: true,
      },
      '/api/tipos-vehiculo': {
        target: 'http://138.68.2.13:8083',
        changeOrigin: true,
      },
      '/api/contratos': {
        target: 'http://138.68.2.13:8084',
        changeOrigin: true,
      },
      '/api/comprobantes': {
        target: 'http://138.68.2.13:8084',
        changeOrigin: true,
      },
      '/api/reportes': {
        target: 'http://138.68.2.13:8085', 
        changeOrigin: true,
      },
    },
  },
})
