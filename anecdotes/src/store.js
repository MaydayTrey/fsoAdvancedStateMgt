
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'



const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  actions: {
    vote: (id) => set(state => ({
      anecdotes: state.anecdotes.map(
        anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
      )})),
    add: (anecdote) => set(state => ({
      anecdotes: state.anecdotes.concat(asObject(anecdote))
    }))
  },
}))

/*
So this is a bit confusing, just how it is structured - but anecdotes is indeed an array of 6 objects
representing notes; we need to be able to change that vote
So I'm wondering as I do this, how I will specify WHICH anecdote it is; I would think the key;
we need it so that we find within anecdotes that which has the proper id;
const result = inventory.find(item => item.name === "cherries")

Issues with my first try; 
    vote: (id) => set(state => ({
      anecdotes: {...state.anecdotes, state.anecdotes.find(anecdote => anecdote.id === id) }
    }))
First: Within braces, everything requires a key - I can't do an expression. Spreads have keys, just they're implicit and numeric.
Second: I need to produce an entirely new array with one item changed, and everything else untouched; map.
state.anecdotes.map(anecdote => 
  anecdote.id === id 
    ?  the changed version 
    : anecdote
)

Code from unicafe; 
 actions: {
        increment: (button) => set(state => ({
            statistics: {...state.statistics, [button]: state.statistics[button] + 1}
        })),
    }, 
*/



export const useAnecdotes = () => 
  useAnecdoteStore(
    useShallow(state => state.anecdotes.toSorted((a, b) => b.votes - a.votes))
  )
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)