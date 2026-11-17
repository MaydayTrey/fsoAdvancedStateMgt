
import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) => set(state => ({
      anecdotes: state.anecdotes.map(
        anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
      )})),
    add: (anecdote) => set(state => ({
      anecdotes: state.anecdotes.concat(asObject(anecdote))
    })),
    setFilter: value => set(() => ({ filter: value })),
    initialize: (newAnecdotes) => set(() => ({ anecdotes: newAnecdotes })) // Long version for readability
  },
}))


export const useAnecdotes = () => {
  const filter = useAnecdoteStore(state => state.filter)
  const anecdotes = useAnecdoteStore(state => state.anecdotes)

  const filtered = anecdotes.filter(n => n.content.includes(filter))
  return filtered.toSorted((a, b) => b.votes - a.votes)
}
  

export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)

/*

*/