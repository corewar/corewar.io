import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Logo from './logo'
import Login from './login'
import UserInfo from './userInfo'

import { media } from '../../styles/mediaQuery'

const Header = styled.header`

  display: grid;
  grid-template-columns: 240px 1fr 120px;

  ${media.phone`
    grid-template-columns: 2fr 1fr;
  `}

`

const SiteHeader = ({isAuthenticated}) => (
  <Header>
    <Logo siteName='corewar' siteDomain='.io' />
    {isAuthenticated ? <UserInfo /> : <Login />}
  </Header>
)

SiteHeader.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default SiteHeader