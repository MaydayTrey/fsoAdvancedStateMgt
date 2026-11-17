import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteFilter from "./components/AnecdoteFilter"
import { useEffect } from "react"
import anecdotesService from "./services/anecdotesService"
import { useAnecdotesActions } from "./store"

const App = () => {
  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  
  return (
    <div>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App