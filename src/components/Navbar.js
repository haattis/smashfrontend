import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, toggleAdmin } from '../actions/auth'
import { push } from 'connected-react-router';
import '../styles/navbar.css'

const Navbar = ({user, isLoading, logout, gotologin, gotoregister, toggleAdmin}) => (
  <div className="navbar">
    <div className="links">
    <Link to="/registermatch"> New match </Link>
      <Link to="/matches"> Recent matches </Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
      {user ? (
        <div className="links">
          {user.isAdmin &&
          <button className="button" onClick={toggleAdmin}>toggle Admin</button>
          }
          <Link to="/profile">Profile</Link>
          <button className="button" onClick={logout}><div className="buttontext">Logout</div></button>
        </div>
      ) : (
        <div className="actions">
          <a href="http://localhost:8080/login">
            <div className="loginButton">
              <img alt="OWLogo" src='/icons/owf-logo.png'/>
              <div className="loginText"> Sign in </div>
            </div>
          </a>
        </div>
      )
      }
  </div>
)

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  gotologin: () => dispatch(push('/login')),
  gotoregister: () => dispatch(push('/register')),
  toggleAdmin: () => dispatch(toggleAdmin())

})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
