import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
let rechartsAlias: string | undefined
try {
  require.resolve('recharts')
} catch {
  rechartsAlias = path.resolve(__dirname, 'src/shims/recharts.tsx')
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...(rechartsAlias ? { recharts: rechartsAlias } : {})
    }
  },
  build: {
    outDir: 'dist'
  }
})
