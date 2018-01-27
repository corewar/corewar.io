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
        <TabLink to='/src'>src</TabLink>
        <TabLink to='/output'>output</TabLink>
        <TabLink to='/core'>core</TabLink>
      </NavBar>
      <Main>
        <Route exact path='/' component={InputInterface} />
        <Route exact path='/src' component={InputInterface} />
        <Route exact path='/output' component={OutputInterface} />
        <Route exact path='/core' component={CoreContainer} />
      </Main>
      <Route exact path='/' component={MobileControls} />
      <Route exact path='/src' component={MobileControls} />
      <Route exact path='/output' component={MobileControls} />
      <Route exact path='/core' component={SimulatorControls} />
    </Container>
  </MobileGrid>
)

export default MobileLayout
