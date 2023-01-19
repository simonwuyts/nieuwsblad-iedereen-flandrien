import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
})
