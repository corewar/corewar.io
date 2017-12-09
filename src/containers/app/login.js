import React from 'react'

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

export default Login