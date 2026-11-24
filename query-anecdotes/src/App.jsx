import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteIncrement } from './requests'


const App = () => {

  const queryClient = useQueryClient()

  const incrementVoteMutation = useMutation({
    mutationFn: voteIncrement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    incrementVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  //This is the TanStack Query useQuery - whcih is setting the key, and fetching the data from the server.
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })


  console.log(JSON.parse(JSON.stringify(result))) //This is a strange console log?
  //We stringify - so turn the JS object to a string, but then parse it, then log it?

  //Loading - the pending state.
  if(result.isPending){
    return(
      <div>Currently loading.</div>
    )
  }

  //On error to fetch
  if (result.isError) {
  return <div>anecdote service not available due to problems in server</div>
}

 //This makes the anecdotes the fetch results now instead of the hardcoded anecdote we had prior.
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App


/*
TanStack Query - implementing useQuery; so we fetch from the JSON server in this situation, and populated anecdotes with that data.
Previously, we instead had a hardcoded anecdotes, but now we fetch it - server source of data. 

What is the useMutation import utility from TanStack? When I think of mutation, I think of in-place data mutation.


import { useQuery, useMutation } from '@tanstack/react-query'
import { getNotes, createNote } from './requests'

const App = () => {
  const newNoteMutation = useMutation({
    mutationFn: createNote,
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.reset()
    newNoteMutation.mutate({ content, important: true })
  }

  //

}

*/