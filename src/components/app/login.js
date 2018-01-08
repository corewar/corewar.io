import React from 'react'
import PropTypes from 'prop-types'

import UserInfo from './userInfo'

import './login.css'

const Login = ({ isAuthenticated }) => (
  <div className="loginContainer">
    {isAuthenticated ?
      <UserInfo /> :
      <div className="loginButtons">
        <button>Login</button>
        <button>Sign up</button>
      </div>
    }
  </div>
)

Login.PropTypes = {
  isAuthenticated: PropTypes.bool
}

export default Login