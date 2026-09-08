import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://icewinds.github.io/SolutionCloud/
export default defineConfig({
  plugins: [react()],
  base: '/SolutionCloud/',
})
