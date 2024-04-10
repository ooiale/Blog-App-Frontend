import axios from 'axios'

//const baseUrl = 'http://localhost:3003/api/comments'
const baseUrl = 'https://blog-app-backend-lyld.onrender.com/api/comments'

export const getAllComments = async () => {
  const comments = await axios.get(baseUrl)
  return comments.data
}

export const createComment = async ({ comment, blogId }) => {
  const response = await axios.post(baseUrl, { comment, blogId })
  return response.data
}