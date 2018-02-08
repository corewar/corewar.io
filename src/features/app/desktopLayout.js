import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../topbar/siteHeader'
import CompleteInterface from './appContainer'

import { colour, space } from '../common/theme'

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const Main = styled.main`
  grid-row-start: 2;
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

const DesktopLayout = () => (
  <DesktopGrid>
    <SiteHeader isAuthenticated={false}/>
    <Main>
      <Route path='/app/src' component={CompleteInterface} />
      <Route path='/app/output' component={CompleteInterface} />
      <Route path='/app/core' component={CompleteInterface} />
    </Main>
  </DesktopGrid>
)

export default DesktopLayout