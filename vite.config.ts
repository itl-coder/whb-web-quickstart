import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 跨域请求的目标地址
        changeOrigin: true, // 是否改变请求来源
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去掉前缀
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
