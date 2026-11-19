import { useAnecdotesActions, useFilter } from "../store";

const AnecdoteFilter = () => {
    const { setFilter } = useAnecdotesActions()
    const filter = useFilter()
    return (
        <div>
            <input data-testid="filter" value={filter} onChange={({ target }) => setFilter(target.value)}/>
        </div>
    )
}

export default AnecdoteFilter