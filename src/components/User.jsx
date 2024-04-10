import { useParams, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const User = () => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users']) ?? []

  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul className="list-group">
        {user.blogs.map(b =>
          <li key={b.id} className="list-group-item">
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )

}

export default User