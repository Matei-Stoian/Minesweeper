import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
<<<<<<< HEAD
  base:"/"
=======
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: "/"
>>>>>>> 550c8d767b38671f363d6ed42a8a4ae2ff613402
})
