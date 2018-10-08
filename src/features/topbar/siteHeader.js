import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Logo from './logo'
import Login from './login'
import UserInfo from './userInfo'
import TabLink from '../common/tabLink'

import { media } from '../common/mediaQuery'
import { colour, space } from '../common/theme'

const Header = styled.header`
  display: grid;
  grid-template-columns: ${space.header} 1fr ${space.header};

  ${media.phone`
    grid-template-columns: 2fr 1fr;
  `}
`

const Nav = styled.div`
  text-align: center;
  display: none;
  color: ${colour.white};
  ${media.tablet`display: flex;`}
  ${media.desktop`display: flex;`}
  ${media.phone`display: none;`}
`

const SiteHeader = ({ isAuthenticated, history }) => (
  <Header>
    <Logo siteName='corewar' siteDomain='.io' history={history} />
    {isAuthenticated ? <UserInfo /> : <Login />}
  </Header>
)

SiteHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default SiteHeader