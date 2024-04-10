import { useContext } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (!notification.message) {
    return <></>
  }

  let alertClass = 'alert'
  switch (notification.color) {
  case 'red':
    alertClass = 'alert alert-warning'
    break
  case 'green':
    alertClass = 'alert alert-success'
    break
  }

  return (
    <div className={alertClass}>
      <p> {notification.message} </p>
    </div>
  )
}

export default Notification
