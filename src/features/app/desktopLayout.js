import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../topbar/siteHeader'
import AppContainer from './appContainer'
import RootGrid from '../common/rootGrid'

import { colour, space } from '../common/theme'

const Main = styled.main`
  grid-row-start: 2;
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

const DesktopLayout = () => (
  <RootGrid>
    <SiteHeader isAuthenticated={false}/>
    <Main>
      <Route path='/app/src' component={AppContainer} />
      <Route path='/app/output' component={AppContainer} />
      <Route path='/app/core' component={AppContainer} />
    </Main>
  </RootGrid>
)

export default DesktopLayout