import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import Comments from './Comments'
import { deleteBlog, updateBlog } from '../services/blogs'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { SignedUserContext } from '../contexts/SignedUserContext'

const Blog = () => {
  const queryClient = useQueryClient()
  const id = useParams().id
  const dispatch = useNotificationDispatch()
  const [user, userReducer] = useContext(SignedUserContext)

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      console.log('deleted with success')
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], prevBlogs.filter(b => {
        return b.id !== blog.id
      }))
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: `DELETED ${blog.title} SUCCESSFULLY`, color: 'green' }, dispatch })
    }
  })

  const handleDeleteBlog = (id) => {
    deleteBlogMutation.mutate(id)
  }

  const voteBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (newObject) => {
      const prevBlogs = queryClient.getQueryData(['blogs'])
      console.log('n', newObject)
      queryClient.setQueryData(['blogs'], prevBlogs.map(b => {
        return b.id === newObject.id
          ?newObject
          : b
      }))
      dispatch({ type: 'SET_NOTIFICATION', payload: { message:`${newObject.title} now has ${newObject.likes} likes`, color:'green' }, dispatch })
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.log('error liking blog', error)
    }
  })

  const handleLikeBlog = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(updatedBlog)
    voteBlogMutation.mutate(updatedBlog)
  }

  const blogs = queryClient.getQueryData(['blogs']) ?? []

  if (blogs.length === 0) return null

  const blog = blogs.find(b => b.id === id) ?? []

  const username = user.username

  return (
    <div className="blog">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {blog.title} by {blog.author}
          </h2>
          <a href={blog.url} className="card-link">{blog.url}</a>
          <p className="card-text">
            {blog.likes} likes <button className="btn btn-primary btn-sm" onClick={() => handleLikeBlog(blog)}> Like </button>
          </p>
          <p className="card-text">Added by: {blog.user.username ? blog.user.username : blog.user}</p>
          {username === blog.user.username ? (
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBlog(blog.id)}> Delete </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <Comments />
    </div>

  )
}

export default Blog
