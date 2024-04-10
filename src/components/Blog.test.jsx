import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    author: 'author',
    title: 'title',
    url: 'url',
    likes: 1,
    user: {
      username: 'username',
    },
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
      username="username"
    />,
  )

  // Check if the title is rendered
  const titleElement = screen.getByText('title')
  expect(titleElement).toBeInTheDocument()
  const authorElement = screen.queryByText('author')
  expect(authorElement).toBeNull()
  const urlElement = screen.queryByText('url')
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText('likes')
  expect(likesElement).toBeNull()
})

test('clicking button display all content', async () => {
  const blog = {
    author: 'author',
    title: 'title',
    url: 'url',
    likes: 1,
    user: {
      username: 'username',
    },
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
      username="username"
    />,
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)

  const titleElement = screen.getByText('title', { exact: false }) // Match case-insensitive text
  expect(titleElement).toBeInTheDocument()

  const authorElement = screen.getByText('author', { exact: false })
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.getByText('link', { exact: false })
  expect(urlElement).toBeInTheDocument()

  const likesElement = screen.getByText('likes', { exact: false })
  expect(likesElement).toBeInTheDocument()
})

test('clicking like button works', async () => {
  const blog = {
    author: 'author',
    title: 'title',
    url: 'url',
    likes: 1,
    user: {
      username: 'username',
    },
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
      username="username"
    />,
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
