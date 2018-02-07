import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'
import ParserInterface from '../parser/combinedContainer'
import Main from '../styledComponents/tablet/main'
import Core from '../styledComponents/tablet/core'
import Container from '../styledComponents/tablet/container'
import SimulatorContainer from '../simulator/simulatorContainer'
import SimulatorControls from '../simulator/controlsContainer'
import MobileControls from '../parser/controlsContainer'

import { space } from '../../styles/theme'

const TabletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${space.header} 1fr;
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