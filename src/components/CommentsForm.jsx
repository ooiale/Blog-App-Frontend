import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createComment } from '../services/comments'

const CommentsForm = () => {
  const [comment, setComment] = useState('')

  const blogId = useParams().id
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (newObject) => {
      console.log('N', newObject)
      const prevComments = queryClient.getQueryData(['comments'])
      queryClient.setQueryData(['comments'],prevComments.concat(newObject))
      queryClient.invalidateQueries(['comments'])
    }
  })

  const handleCreateComment = async (event) => {
    event.preventDefault()
    createCommentMutation.mutate({ comment, blogId })
    setComment('')
  }

  return (
    <form onSubmit={handleCreateComment}>
      <input value={comment} onChange={(e) => setComment(e.target.value)}/>
      <button type='submit'> create </button>
    </form>
  )
}

export default CommentsForm