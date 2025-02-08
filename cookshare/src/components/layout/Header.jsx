import React from 'react'
import {Navbar, Nav} from "react-bootstrap"

const Header = () => {
return (
  <Navbar expand='lg' className='navbar mt-2 '>
    <Navbar.Brand className='logo' style={{ color: "white", fontSize: "28px" }}>
      <a href='/' className='nav-links'>
        CookShare
      </a>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className='me-auto'>
        <a href='/aboutus' className='nav-links'>
          What we do at CookShare
        </a>
      </Nav>
      <Nav className='me-5'>
        <a href='/login' className='nav-links'>
          Login to Share Your Recipes
        </a>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
}

export default Header
