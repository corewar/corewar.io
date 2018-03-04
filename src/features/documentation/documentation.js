import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import SiteNav from '../common/siteNav'
import DocumentationHeader from '../documentationHeader/documentationHeader'
import ImpTutorialContainer from '../documentation/impTutorialContainer'
import Concepts from '../documentation/concepts'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const DocumentationGrid = styled.main`
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: ${space.header} auto auto;
  grid-template-columns: 100%;
  color: ${colour.white};
`

const Lede = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${space.xl};
  margin-bottom: ${space.xl};
  padding-top: ${space.l};

  h2 {
    font-size: ${font.large};
    width: 50%;
    ${media.tablet`width: 80%;`}
    text-align: center;
    color: ${colour.blue};
    font-family: ${font.code};
  }
`

const DocumentationNav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  a {
    color: ${colour.lightgrey};
    font-size: ${font.large};
    font-weight: 300;
    text-decoration: none;
    margin: ${space.m};

    :hover {
      text-decoration: underline;
    }
  }

  .active {
    color: ${colour.white};
    text-decoration: underline;
  }
`

const Documentation = () => (
  <DocumentationGrid>
    <SiteNav />
    <DocumentationHeader />
    <Lede>
      <h2>Explore the documentation to learn the concepts and techniques of corewar</h2>
    </Lede>
    <DocumentationNav>
      <NavLink to='/learn/1'>1. Concepts</NavLink>
      <NavLink to='/learn/2'>2. Imp Tutorial</NavLink>
    </DocumentationNav>
    <Route exact path={`/learn/1`} component={Concepts} />
    <Route exact path={`/learn/2`} component={ImpTutorialContainer} />
  </DocumentationGrid>
)

export default Documentation