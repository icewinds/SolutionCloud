import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the custom domain root: https://solutioncloud.tech/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
