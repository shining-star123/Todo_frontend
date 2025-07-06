import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Todo_frontend/',
  test: {
    environment: 'happy-dom',

    include: [
      'src/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.spec.{ts,tsx,js,jsx}',
    ],

    exclude: [
      'node_modules',
      'dist',
      '**/*.config.*',
      '**/node_modules/**',
      '**/dist/**'
    ],
  },
})
