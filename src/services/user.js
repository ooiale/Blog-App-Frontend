import axios from 'axios'

//const baseUrl = 'http://localhost:3003/api/users'
const baseUrl = 'https://blog-app-backend-lyld.onrender.com/api/users'

export const getAllUsers = async() => {
  const users = await axios.get(baseUrl)
  return users.data
}

export const registerUser = async(credentials) => {
  const newUser = await axios.post(baseUrl, credentials)
  return newUser.data
}