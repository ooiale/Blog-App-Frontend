import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/login'
const baseUrl = 'https://blog-app-backend-lyld.onrender.com/api/login'

export const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default login
