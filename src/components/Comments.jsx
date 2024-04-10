import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import CommentsForm from './CommentsForm'
import { getAllComments } from '../services/comments'

const Comments = () => {
  const id = useParams().id
  const result = useQuery({
    queryKey: ['comments'],
    queryFn: getAllComments,
    retry: 3
  })

  const allComments = result.data ?? []
  const comments = allComments.length > 0
    ? allComments.filter(c => c.blogId === id)
    : []

  return (
    <div className="comments">
      <h3 className="mt-3 mb-3">Comments</h3>
      <CommentsForm />
      <ul className="list-group">
        {comments.map(c => (
          <li key={c.id} className="list-group-item">{c.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments