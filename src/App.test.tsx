import '@testing-library/jest-dom/vitest'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import axios from 'axios'
import type { Mocked } from 'vitest'

import App from './App'
import { store } from './store/store'

vi.mock('axios', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

const mockedAxios = axios as Mocked<typeof axios>

describe('App Component', () => {
  const mockCategories = ['Work', 'Home']
  const mockTodos = [
    {
      id: '1',
      title: 'Todo 1',
      description: 'Desc 1',
      category: 'Work',
      completed: false,
      dueDate: '2025-07-01',
    },
    {
      id: '2',
      title: 'Todo 2',
      description: 'Desc 2',
      category: 'Home',
      completed: true,
      dueDate: '2025-07-02',
    },
  ]

  beforeEach(() => {
    vi.resetAllMocks()
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.endsWith('/category')) return Promise.resolve({ data: mockCategories })
      if (url.includes('/todos/'))   return Promise.resolve({ data: mockTodos })
      return Promise.resolve({ data: [] })
    })
  })

  it('loading data', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(await screen.findByRole('button', { name: 'Work' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(await screen.findByText('Todo 1 | Work')).toBeInTheDocument()
    expect(await screen.findByText('Todo 2 | Home')).toBeInTheDocument()
  })
})
