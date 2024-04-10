import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = vi.fn()
  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await userEvent.type(titleInput, 'testing a form...')
  await userEvent.type(authorInput, 'testing a form...')
  await userEvent.type(urlInput, 'testing a form...')
  await userEvent.click(sendButton)

  expect(addBlog).toHaveBeenCalledTimes(1)
  expect(addBlog).toHaveBeenCalledWith({
    title: 'testing a form...',
    author: 'testing a form...',
    url: 'testing a form...',
  })
})
