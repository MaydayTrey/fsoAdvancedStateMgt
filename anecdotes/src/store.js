
import { create } from 'zustand'
import anecdotesService from './services/anecdotesService'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      //1. Get the current anecdote
      const anecdoteToUpdate = get().anecdotes.find(n => n.id === id)
      //2. Await the service call
      const anecdoteUpdated = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      const updated = await anecdotesService.voteUpdate(anecdoteUpdated)
      //3. Set, using what came back
      set(state => ({ anecdotes: state.anecdotes.map(n => n.id === id ? updated : n) }))
  },
    add: async (anecdote) => {
      const newAnecdote = await anecdotesService.createAnecdote(anecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
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