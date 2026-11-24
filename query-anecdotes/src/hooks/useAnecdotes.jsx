import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteIncrement } from '../requests'
import { useNotify } from '../NotificationContext'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: () => {
      notify('too short anecdote, must have length 5 or more')
    },
  })

  const incrementVoteMutation = useMutation({
    mutationFn: voteIncrement,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${updatedAnecdote.content}' voted`)
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: (anecdote) =>
      incrementVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}