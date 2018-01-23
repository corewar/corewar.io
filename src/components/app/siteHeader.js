import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Logo from './logo'
import Login from './login'
import UserInfo from './userInfo'
import TabLink from '../styledComponents/tabLink'

import { media } from '../../styles/mediaQuery'
import { colour, space } from '../../styles/theme'

const Header = styled.header`
  display: grid;
  grid-template-columns: 240px 1fr 180px;

  ${media.phone`
    grid-template-columns: 2fr 1fr;
  `}
`

const Nav = styled.div`

  text-align: center;

  display: none;
  color: ${colour.white};
  ${media.tablet`display: flex;`}
  ${media.phone`display: none;`}

`

const SiteHeader = ({isAuthenticated}) => (
  <Header>
    <Logo siteName='corewar' siteDomain='.io' />
    <Nav>
      <TabLink to='/src'>src</TabLink>
      <TabLink to='/core'>core</TabLink>
    </Nav>
    {isAuthenticated ? <UserInfo /> : <Login />}
  </Header>
)

SiteHeader.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default SiteHeader