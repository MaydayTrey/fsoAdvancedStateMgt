const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl) //Default GET
    if(!response.ok){ //Must check for failure manually
        throw new Error('Failed to fetch the anecdotes!')
    }
    const data = await response.json() //Must convert the JSON to an object
    return data //Return the data
}
export default { getAll }