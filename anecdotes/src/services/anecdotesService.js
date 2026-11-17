const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl) //Default GET
    if(!response.ok){ //Must check for failure manually
        throw new Error('Failed to fetch the anecdotes!')
    }
    const data = await response.json() //Must convert the JSON to an object
    return data //Return the data
}

const createAnecdote = async (anecdote) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }) 

    if(!response.ok) {
        throw new Error('Failed to create the anecdote!') 
    }

    return await response.json()
}

const voteUpdate = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    })

    if(!response.ok){
        throw new Error('Failed to vote!')
    }
    return await response.json()
}
export default { getAll, createAnecdote, voteUpdate }