import { setToken } from '../services/blogs'
import { useNavigate } from 'react-router-dom'

import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSignedUserDispatch } from '../contexts/SignedUserContext'

const Logout = () => {
  const userDispatch = useSignedUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  const setNotification = (message, color) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message: message, color: color }, dispatch: notificationDispatch })
  }
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    setToken(null)
    setNotification('Successfully logged out', 'green')
    userDispatch({ type: 'LOGOUT' })
    navigate('/')
  }
  return (
    <button onClick={handleLogout} className="btn btn-dark text-light">Logout</button>

  )
}

export default Logout