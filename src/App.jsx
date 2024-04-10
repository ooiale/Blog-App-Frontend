import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { SignedUserContext } from './contexts/SignedUserContext'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import HomePageLogin from './components/HomePageLogin'
import HomePageBlogsHeader from './components/HomePageBlogsHeader'
import Users from './components/Users'
import BlogList from './components/BlogList'
import User from './components/User'
import RegisterUser from './components/RegisterUser'

const App = () => {
  const [user, userReducer] = useContext(SignedUserContext)


  useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 3,
    refetchOnWindowFocus: false
  })


  if (user === null) {
    return(
      <Router>
        <Routes>
          <Route path='/' element = {<HomePageLogin />}/>
          <Route path='/register' element = {<RegisterUser />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <HomePageBlogsHeader user={user}/>
      <div>
        <Notification />
      </div>
      <div>
        <Routes>
          <Route path='/' element = {<BlogList />}/>
          <Route path='/users' element = {<Users />}/>
          <Route path='/users/:id' element = {<User />}/>
          <Route path='/blogs/:id' element = {<Blog />}/>
          <Route path='/blogs/create-new' element = {<BlogForm />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
