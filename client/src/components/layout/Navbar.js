import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
//material ui

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


const Navbar = ({ auth: { isAuthenticated ,isAdmin}, logout }) => {
  const authLinks = (
    <ul>
     
     
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const adminLinks=(
    <ul>
      
      <li>
        <Link to="/adminPanel">Admin Panel</Link>
      </li>
    
    </ul>
  )
const notAdmin=(
  <Fragment></Fragment>
)
  const guestLinks = (
    <ul>
   
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
   
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <nav className="navbar bg-dark">
        <Toolbar>
        <Link to="/">
          <i className="fas fa-code" /> Google Events App
        </Link>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        <Fragment>{isAdmin ? adminLinks : notAdmin}</Fragment>
        </Toolbar>
        </nav>
      </AppBar>
    </Box>


      
  
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
