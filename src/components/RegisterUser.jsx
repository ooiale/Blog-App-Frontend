import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'

import Notification from './Notification'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { registerUser } from '../services/user'

const RegisterUser = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const notificationDispatch = useNotificationDispatch()

  const dispatchNotification = (message, color) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message,color }, dispatch: notificationDispatch })
  }

  const handleRegister = async() => {
    try {
      await registerUser({ name, username, password })
      navigate('/')
      dispatchNotification(`user ${username} was registered`, 'green')
    } catch (error) {
      dispatchNotification('password must be atleast 3 characters long', 'red')
      //console.log('error registering user', error)
    }
    setName('')
    setUsername('')
    setPassword('')
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
        </div>
      </nav>
      <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <Notification />
          <h2 className="text-center">Register</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterUser
