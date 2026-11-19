import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteFilter from "./components/AnecdoteFilter"
import { useEffect } from "react"
import anecdotesService from "./services/anecdotesService"
import { useAnecdotesActions } from "./store"
import Notification from "./components/Notification"

const App = () => {
  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  
  return (
    <div>
      <Notification />
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App