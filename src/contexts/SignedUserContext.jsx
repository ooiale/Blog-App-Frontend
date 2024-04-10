import { createContext, useContext, useReducer } from 'react'
import { setToken } from '../services/blogs'

const isThereSignedUser =  () => {
  const loggedUserJSON = window.localStorage.getItem('savedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setToken(user.token)
    return user
  }
  return null
}

const signedUserReducer =  (state, action) => {
  switch(action.type) {
  case 'LOGIN_SUCCESS': {
    window.localStorage.setItem('savedUser', JSON.stringify(action.payload))
    setToken(action.payload.token)
    return action.payload
  }
  case 'LOGOUT': {
    window.localStorage.removeItem('savedUser')
    setToken(null)
    return null
  }
  case 'LOGIN_FAIL': {
    return null
  }
  default: return state
  }
}

export const SignedUserContext = createContext()

export const SignedUserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(signedUserReducer, isThereSignedUser())

  return (
    <SignedUserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </SignedUserContext.Provider>
  )
}

export const useSignedUserDispatch = () => {
  const userAndDispatch = useContext(SignedUserContext)
  return userAndDispatch[1]
}