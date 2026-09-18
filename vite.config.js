import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('firebase')) return 'firebase'
          if (id.includes('antd') || id.includes('@ant-design') || id.includes('rc-')) return 'antd'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'react-vendor'
          if (id.includes('lucide-react')) return 'icons'

          return 'vendor'
        },
      },
    },
  },
})
