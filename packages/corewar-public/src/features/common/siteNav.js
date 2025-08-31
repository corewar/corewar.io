import React from 'react'
import styled from 'styled-components'

import { colour, space } from '../common/theme'
import { media } from '../common/mediaQuery'

const Header = styled.header`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 ${space.xl};
  ${media.phone`margin: 0;`}

  a {
    color: ${colour.grey};
    padding-bottom: ${space.s};
    margin: 0 ${space.s};
    ${media.phone`margin: 0;`}
    display: inline-block;
    min-width: 80px;
    text-decoration: none;
    font-weight: 400;
    text-align: center;
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }

  a:hover {
    border-bottom: 2px solid ${colour.blue};
    colour: ${colour.white};
    transition: 0.5s;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  ${media.phone`justify-content: center;`}
  align-items: center;
  width: 100%;
`

const SiteNav = () => (
  <Header>
    <Nav>
      <a href={`/app/editor/src`}>play</a>
      <a href={`/learn`}>learn</a>
      <a href={`/#features`}>features</a>
      <a href={`/sign-up`}>sign up</a>
      <a href={`/contact-us`}>contact us</a>
      <a href={`https://github.com/corewar/corewar`}>code</a>
    </Nav>
  </Header>
)

export default SiteNav
