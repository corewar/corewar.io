import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colour, font, space } from '../../styles/theme'
import { media } from '../../styles/mediaQuery'

import UserInfo from './userInfo'

const LoginModule = styled.div`

  background-color: ${colour.coral};
  grid-column-start: 3;

  ${media.phone`
    grid-column-start: 2;
  `}

`

const LinkContainer = styled.div`
  color: ${colour.white};
  text-align: center;
  padding-top: ${space.m}
`

const StyledLink = styled(Link)`
  color: ${colour.white};
  font-weight: 300;
  font-size: ${font.base};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Login = ({ isAuthenticated }) => (
  <LoginModule>
    {isAuthenticated ?
      <UserInfo /> :
      <LinkContainer>
        <StyledLink to='/'>login</StyledLink> / <StyledLink to='/'>sign up</StyledLink>
      </LinkContainer>
    }
  </LoginModule>
)

Login.PropTypes = {
  isAuthenticated: PropTypes.bool
}

export default Login