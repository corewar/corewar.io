import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colour, font, space } from '../../styles/theme'
import { media } from '../../styles/mediaQuery'

import UserInfo from './userInfo'
import HeaderLink from '../styledComponents/headerLink'

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


const Login = ({ isAuthenticated }) => (
  <LoginModule>
    {isAuthenticated ?
      <UserInfo /> :
      <LinkContainer>
        <HeaderLink to='/'>login</HeaderLink> / <HeaderLink to='/'>sign up</HeaderLink>
      </LinkContainer>
    }
  </LoginModule>
)

Login.PropTypes = {
  isAuthenticated: PropTypes.bool
}

export default Login