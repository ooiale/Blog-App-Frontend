import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getAllUsers } from '../services/user'

const Users = () => {
  const queryClient = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    retry: 3
  })
  const users = queryClient.data
    ? queryClient.data
    : []


  return (
    <div>
      <h2 className=''> Users </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.name}>
              <td> <Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users