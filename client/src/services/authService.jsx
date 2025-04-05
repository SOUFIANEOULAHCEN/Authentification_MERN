import axios from 'axios'

const API_URL = 'http://localhost:4000/auth'
// const API_URL = "http://server:4000/auth";

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}

const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  if (response.data.user.token) {
    localStorage.setItem('token', response.data.user.token)
  }
  return response.data.user
}

const checkAuth = async () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  const response = await axios.get(`${API_URL}/dashbordAdmin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export { registerUser, loginUser, checkAuth }