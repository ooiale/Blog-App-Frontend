import { Container, Col, Row } from 'react-bootstrap'

import Notification from './Notification'
import LoginForm from './LoginForm'
import './homePageLogin.css'

const HomePageLogin = () => {
  return (
    <Container fluid className="homepage-container p-0 bg-gradient">
      <Row className="row-cols-3">
        <Col xs={4}></Col>
        <Col xs={4} className="d-flex justify-content-center align-items-center">
          <Row>
            <Col xs={12} className="mt-3 pt-5 text-center" >
              <Notification />
              <LoginForm />
            </Col>
          </Row>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  )
}

export default HomePageLogin