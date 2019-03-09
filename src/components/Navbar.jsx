import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import '../styles/navbar.css';

const Navbar = ({
  user, isLoading, logoutUser,
}) => (
  <div className="navbar">
    <div className="links">
      <Link to="/registermatch"> New match </Link>
      <Link to="/matches"> Recent matches </Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
    {user ? (
      <div className="links">
        {user.isAdmin && false
          && <Link to="/admin">Admin</Link>
          }
        <Link to="/profile">Profile</Link>
        <button type="button" className="button" onClick={logoutUser}><div className="buttontext">Logout</div></button>
      </div>
    ) : (
      <div className="actions">
        <a href="http://localhost:8080/login">
          <div className="loginButton">
            <img alt="owlogo" src="/icons/owf-logo.png" />
            <div className="loginText"> Sign in </div>
          </div>
        </a>
      </div>
    )
      }
  </div>
);

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
