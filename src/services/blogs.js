import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/blogs'
const baseUrl = 'https://blog-app-backend-lyld.onrender.com/api/blogs'
let token = null

export const setToken = (newToken) => {
  token = newToken === null ? null : `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export const create = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const updateBlog = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, updateBlog, deleteBlog }
