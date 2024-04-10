import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const queryClient = useQueryClient()

  const blogs = queryClient.getQueryData(['blogs'])
    ? queryClient.getQueryData(['blogs'])
    : []

  return (

    <Table striped  >
      <thead>
        <tr>
          <th colSpan="2" className='p-0'>
            <div className="d-flex justify-content-between align-items-end">
              <span className="fs-1">Blogs</span>
              <Link to={'/blogs/create-new'} className="btn btn-dark text-light fs-8 text-end"> new blog </Link>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

  )
}

export default BlogList