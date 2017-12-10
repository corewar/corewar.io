import React from 'react'

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

export default SiteHeader