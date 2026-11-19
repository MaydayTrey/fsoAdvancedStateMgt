import { beforeEach, expect, test, vi } from 'vitest'
import { render, renderHook, act, waitFor } from '@testing-library/react'

import anecdotesService from './services/anecdotesService'
import { useAnecdoteStore, useAnecdotes, useAnecdotesActions } from './store'
import App from './App'

vi.mock('./services/anecdotesService', () => ({
  default: {
    getAll: vi.fn(),
    createAnecdote: vi.fn(),
    voteUpdate: vi.fn(),
    remove: vi.fn(),
  },
}))

const backendAnecdotes = [
  { content: 'Real artists ship code', id: '1', votes: 7 },
  { content: 'Simplicity is the ultimate sophistication', id: '2', votes: 5 },
  { content: 'Untested code is broken code', id: '3', votes: 3 },
  { content: 'There are two hard things in computer science', id: '4', votes: 1 },
  { content: 'Make it work, then make it fast', id: '5', votes: 0 },
]

beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

// 14
test('state is initialized with the anecdotes returned by the backend', async () => {
  anecdotesService.getAll.mockResolvedValue(backendAnecdotes)

  render(<App />)

  await waitFor(() => {
    expect(useAnecdoteStore.getState().anecdotes).toEqual(backendAnecdotes)
  })
  expect(anecdotesService.getAll).toHaveBeenCalledTimes(1)
})

// 15
test('the component displaying anecdotes receives them sorted by votes', () => {
  useAnecdoteStore.setState({
    anecdotes: [...backendAnecdotes].reverse(),
    filter: '',
  })

  const { result } = renderHook(() => useAnecdotes())

  expect(result.current.map(a => a.votes)).toEqual([7, 5, 3, 1, 0])
  expect(result.current[0].content).toBe('Real artists ship code')
})

// 16
test('the component receives a properly filtered list of anecdotes', () => {
  useAnecdoteStore.setState({ anecdotes: backendAnecdotes, filter: 'code' })

  const { result } = renderHook(() => useAnecdotes())

  expect(result.current.map(a => a.content)).toEqual([
    'Real artists ship code',
    'Untested code is broken code',
  ])
})

// 17
test('voting increases the number of votes for an anecdote', async () => {
  useAnecdoteStore.setState({ anecdotes: backendAnecdotes, filter: '' })
  anecdotesService.voteUpdate.mockImplementation(async (anecdote) => anecdote)

  const { result } = renderHook(() => useAnecdotesActions())

  await act(async () => {
    await result.current.vote('3')
  })

  const voted = useAnecdoteStore.getState().anecdotes.find(a => a.id === '3')
  expect(voted.votes).toBe(4)
  expect(anecdotesService.voteUpdate).toHaveBeenCalledWith({
    content: 'Untested code is broken code',
    id: '3',
    votes: 4,
  })
})