import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "./", // ✅ this is the fix
  plugins: [tailwindcss(), react()],
})
