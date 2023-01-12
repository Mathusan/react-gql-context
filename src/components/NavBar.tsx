import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'

import  useAuth  from '../hooks/useAuth';

import { useMutation } from '@apollo/client';
import { LOG_OUT } from '../mutations/userMutations';

export default function NavBar() {

    const navigate = useNavigate()
    const { auth,setAuth } = useAuth();


    const [logout] = useMutation(LOG_OUT,{
      update(proxy) {
        
      }
    })

    const logOut = () =>{
      logout();
      setAuth({accessToken:'', isLoggedIn:false});
      navigate('/')
    }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {auth.isLoggedIn ? (
              <Nav.Link href="/login" onClick={logOut}>Logout</Nav.Link>
          ):(
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
