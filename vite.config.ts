import { defineConfig } from 'vitest/config'

export default defineConfig({
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
