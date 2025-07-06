import '@testing-library/jest-dom/vitest'
import { beforeAll, describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'

vi.mock('axios', () => ({
  __esModule: true,
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('entry point', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('mount React', async () => {
    await import('./main.tsx')

    await waitFor(() => {
      const root = document.getElementById('root')
      expect(root).not.toBeNull()
      expect(root).toHaveTextContent('Todos')
    })
  })
})
