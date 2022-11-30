import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './AuthButtons';
import './header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem>
        <Link to="/About" className="nav-link">About</Link>
        </NavItem>
        <NavItem>
        <Link to="/Profile" className="nav-link">Profile</Link>
        </NavItem>
        <AuthButtons/>
      </Navbar>
    )
  }
}

export default Header;
