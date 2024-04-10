import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION': {
    setTimeout(() => action.dispatch({ type: 'RESET_NOTIFICATION' }), 3000)
    return (
      { message: action.payload.message, color: action.payload.color }
    )
  }
  case 'RESET_NOTIFICATION': return ''
  default: return state

  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '', color: 'green' })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}


