import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, add }= useAnecdotesActions()

  const addAnecdote = (e) => {    
    e.preventDefault()    
    const content = e.target.anecdote.value    
    add(content)    
    e.target.reset()  
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}~
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App

/* 
  const { add } = useNoteActions()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const addNote = (e) => {    
    e.preventDefault()    
    const content = e.target.note.value    
    add({ id: generateId(), content, important: false })    
    e.target.reset()  
  }

  return (
    <div>
      <form onSubmit={addNote}>        
        <input name="note" />        
        <button type="submit">add</button>      
      </form>   


*/