import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Logo from './logo'
import Login from './login'
import UserInfo from './userInfo'

import { media } from '../../styles/mediaQuery'
import { colour, space } from '../../styles/theme';

const Header = styled.header`

  display: grid;
  grid-template-columns: 240px 1fr 180px;

  ${media.phone`
    grid-template-columns: 2fr 1fr;
  `}

`

const Nav = styled.div`

  display: none;
  color: ${colour.white};
  ${media.tablet`display: block;`}
  ${media.phone`display: none;`}

  ul {
    width: 100%;
  }

  ul > li {
    list-style: none;
    display: inline-block;
    width: 50%;
    height: ${space.header};
    text-align: center;
    padding-top: ${space.m};
  }

  li:hover {
    background-color: ${colour.lightbg};
    cursor: pointer;
  }

  li.selected {
    background-color: ${colour.defaultbg};
  }

`

const SiteHeader = ({isAuthenticated}) => (
  <Header>
    <Logo siteName='corewar' siteDomain='.io' />
    <Nav>
      <ul>
        <li className='selected'>src</li>
        <li>core</li>
      </ul>
    </Nav>
    {isAuthenticated ? <UserInfo /> : <Login />}
  </Header>
)

SiteHeader.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default SiteHeader