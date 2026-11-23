import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  //This is the TanStack Query useQuery - whcih is setting the key, and fetching the data from the server.
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if(!response.ok){
        throw new Error('Failed to fetch the anecdotes')
      }
      return response.json()
    }
  })


  console.log(JSON.parse(JSON.stringify(result))) //This is a strange console log?
  //We stringify - so turn the JS object to a string, but then parse it, then log it?

  if(result.isPending){
    return(
      <div>Currently loading.</div>
    )
  }

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

*/