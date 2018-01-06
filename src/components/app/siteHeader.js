import React from 'react'
import PropTypes from 'prop-types'

import Logo from './logo'
import Login from './login'
import UserInfo from './userInfo'

import './siteHeader.css'

const SiteHeader = ({isAuthenticated}) => (
  <header>
    <Logo logoText='COREWAR' />
    {isAuthenticated ? <UserInfo /> : <Login />}
  </header>
)

SiteHeader.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default SiteHeader