import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './../../components/app/siteHeader'
import DebugInterface from './../../components/app/debugInterface'
import ParserInterface from './../../components/app/parserInterface'
import OutputInterface from '../../components/app/outputInterface'

import { colour, space } from '../../styles/theme'

const RootGrid = styled.div`

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;

  main {
    background-color: ${colour.darkbg};
    height: calc(100vh - ${space.header});
    width: 100vw;
  }
`

const App = () => (
  <RootGrid>
    <SiteHeader isAuthenticated={false}/>
    <main>
      <Route exact path="/" component={ParserInterface} />
      <Route exact path="/parser" component={DebugInterface} />
      <Route exact path='/src' component={ParserInterface} />
      <Route exact path='/output' component={OutputInterface} />
      <Route exact path='/core' component={ParserInterface} />
    </main>
  </RootGrid>
)

export default App
