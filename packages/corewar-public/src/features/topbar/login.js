import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colour, space } from '../common/theme'
import { media } from '../common/mediaQuery'

import UserInfo from './userInfo'
import HeaderLink from './headerLink'

const LoginModule = styled.div`
  grid-column-start: 3;
  background-color: ${colour.coral};
  margin: ${space.s};

  ${media.phone`
    grid-column-start: 2;
  `}
`

const LinkContainer = styled.div`
  color: ${colour.white};
  text-align: center;
  padding-top: ${space.s};
`

const Login = ({ isAuthenticated }) => (
  <LoginModule>
    {isAuthenticated ? (
      <UserInfo />
    ) : (
      <LinkContainer>
        {/* <HeaderLink to='/'>log in</HeaderLink> / */}
        <HeaderLink to="/sign-up">sign up</HeaderLink>
      </LinkContainer>
    )}
  </LoginModule>
)

Login.propTypes = {
  isAuthenticated: PropTypes.bool
}

export default Login
