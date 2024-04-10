import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logout from './Logout'

const HomePageBlogsHeader = ({ user }) => {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Navbar.Brand href="/" className='fs-2 p-2'>blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link as={Link} to="/" className="nav-link fw-bold fs-4">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users" className="nav-link fw-bold fs-4">Users</Nav.Link>
        </Nav>
        <Navbar.Text>
          {user.name} logged in <Logout />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HomePageBlogsHeader