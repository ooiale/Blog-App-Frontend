import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { create } from '../services/blogs'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const navigate = useNavigate()

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newObject) => {
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], prevBlogs.concat(newObject))
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: `a new blog ${newObject.title} by ${newObject.author} added`, color: 'green' }, dispatch })
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.log('error on mutating a new blog', error)
    }
  })

  const createBlog = async (event) => {
    event.preventDefault()
    const blogToCreate = {
      title,
      author,
      url,
    }
    newBlogMutation.mutate(blogToCreate)
    navigate('/')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div >
      <h4 className='p-1 text-center pt-3'> Create New Blog </h4>
      <form onSubmit={createBlog}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label p-1">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label p-1">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={author}
            placeholder="Enter author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label p-1">URL</label>
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            value={url}
            placeholder="Enter URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="btn btn-dark text-light" type="submit">Create</button>
      </form>
    </div>

  )
}

export default BlogForm
