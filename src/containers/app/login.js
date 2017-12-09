import React from 'react'

import UserInfo from './userInfo'

import './login.css'

const Login = ({ isAuthenticated }) => (
  <div className="login">
    {isAuthenticated ?
      <UserInfo /> :
      <div>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    }
  </div>
)

export default Login