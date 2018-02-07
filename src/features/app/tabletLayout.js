import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'
import ParserInterface from '../parser/combinedContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import SimulatorControls from '../simulator/controlsContainer'
import MobileControls from '../parser/controlsContainer'

import { colour, space } from '../common/theme'

const TabletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${space.header} 1fr;
`

const Main = styled.main`
  height: calc(100vh - ${space.controls} - ${space.header});
  background-color: ${colour.defaultbg};
`

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 1fr ${space.controls};
  grid-template-columns: 1fr;
`

const TabletLayout = () => (
  <TabletGrid>
    <SiteHeader isAuthenticated={false}/>
    <Container>
      <Main>
        <Route exact path='/app/src' component={ParserInterface} />
        <Route exact path='/app/output' component={ParserInterface} />
        <Route exact path='/app/core' component={SimulatorContainer} />
      </Main>
      <Route exact path='/app/src' component={MobileControls} />
      <Route exact path='/app/output' component={MobileControls} />
      <Route exact path='/app/core' component={SimulatorControls} />
    </Container>
  </TabletGrid>
)

export default TabletLayout