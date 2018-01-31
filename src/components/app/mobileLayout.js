import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'

import Container from '../styledComponents/mobile/container'
import NavBar from '../styledComponents/mobile/navBar'
import Main from '../styledComponents/mobile/main'
import TabLink from '../styledComponents/tabLink'

import InputInterface from '../../containers/app/inputInterface'
import OutputInterface from '../../containers/app/outputInterface'
import CoreContainer from '../../containers/simulator/coreContainer'
import MobileControls from '../../containers/parser/mobileControls'
import SimulatorControls from '../../containers/simulator/simulatorControls'

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const MobileLayout = () => (
  <MobileGrid>
    <SiteHeader isAuthenticated={false}/>
    <Container>
      <NavBar>
        <TabLink to='/app/src'>src</TabLink>
        <TabLink to='/app/output'>output</TabLink>
        <TabLink to='/app/core'>core</TabLink>
      </NavBar>
      <Main>
        <Route exact path='/app/src' component={InputInterface} />
        <Route exact path='/app/output' component={OutputInterface} />
        <Route exact path='/app/core' component={CoreContainer} />
      </Main>
      <Route exact path='/app/src' component={MobileControls} />
      <Route exact path='/app/output' component={MobileControls} />
      <Route exact path='/app/core' component={SimulatorControls} />
    </Container>
  </MobileGrid>
)

export default MobileLayout
