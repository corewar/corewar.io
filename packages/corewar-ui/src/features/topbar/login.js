import React from 'react'
import PropTypes from 'prop-types'
import UserInfo from './userInfo'

const Login = ({ isAuthenticated }) => (
  <div className="bg-coral col-start-2 md:col-start-3 flex justify-center">
    {isAuthenticated ? (
      <UserInfo />
    ) : (
      <div className="flex items-center text-white">
        <a className="font-light text-white hover:underline" href="/sign-up">
          sign up
        </a>
      </div>
    )}
  </div>
)

Login.propTypes = {
  isAuthenticated: PropTypes.bool
}

export default Login
