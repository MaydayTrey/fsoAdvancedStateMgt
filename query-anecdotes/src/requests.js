const baseUrl = 'http://localhost:3001/anecdotes'

//Initial fetch of the anecdotes from the endpoint. 
export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }
  return await response.json()
}


// Creation of the anecdote - utilizng Fetch API; with established HTTP methods. 
export const createAnecdote = async (newAnecdote) => {
    const httpOptions = {
        method: 'POST', //POST Http method
        headers: { 'Content-Type': 'application/json' }, //Meta-data for server
        body: JSON.stringify(newAnecdote) //Stringify before sending over the wire
    }

    const response = await fetch(baseUrl, httpOptions)
    if(!response.ok){
        throw new Error('Failed in creating the new anecdote')
    }
    const data = response.json()
    return data
}


export default { getAnecdotes, createAnecdote }