import { useState } from 'react'
import { Link } from 'react-router-dom'

import Toggleable from './Toggleable'
import { login } from '../services/login'
import { useSignedUserDispatch } from '../contexts/SignedUserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useSignedUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const dispatchNotification = (message, color) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message,color }, dispatch: notificationDispatch })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      userDispatch({ type: 'LOGIN_SUCCESS', payload: user })
      dispatchNotification(`Successfully logged in on ${username}` , 'green')
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatchNotification('LOGIN OR USERNAME INVALID', 'red')
      userDispatch({ type: 'LOGIN_FAIL' })
    }
  }
  return (
    <div className="container">
      <h2 className="text-center">Log in to Application</h2>
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <Toggleable buttonLabel={'Log In'}>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </Toggleable>
        </div>
      </div>
      <Link className="btn btn-secondary mt-3" to={'/register'}>Register</Link>
    </div>
  )
}


export default LoginForm
