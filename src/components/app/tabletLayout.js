import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'
import ParserInterface from '../../containers/app/parserInterface'
import Main from '../styledComponents/tablet/main'
import Core from '../styledComponents/tablet/core'
import Container from '../styledComponents/tablet/container'
import CoreContainer from '../../containers/simulator/coreContainer'
import SimulatorControls from '../../containers/simulator/simulatorControls'
import MobileControls from '../../containers/parser/mobileControls'

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
        <Route exact path='/app/core' component={CoreContainer} />
      </Main>
      <Route exact path='/app/src' component={MobileControls} />
      <Route exact path='/app/output' component={MobileControls} />
      <Route exact path='/app/core' component={SimulatorControls} />
    </Container>
  </TabletGrid>
)

// const ParserWrapper = () => (
//   <Main>
//     <ParserInterface />
//   </Main>
// )

// const CoreWrapper = () => (
//   <Core>
//     <CoreContainer />
//     <SimulatorControls />
//   </Core>
// )

export default TabletLayout