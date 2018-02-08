import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../topbar/siteHeader'
import TabLink from '../topbar/tabLink'

import InputInterface from '../parser/inputContainer'
import OutputInterface from '../parser/outputContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import MobileControls from '../parser/controlsContainer'
import SimulatorControls from '../simulator/controlsContainer'

import { colour, space } from '../common/theme'

// TODO: topbar feature?
const NavBar = styled.div`
  grid-row-start: 2;
  display: flex;
  text-align: center;
`

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: ${space.s} ${space.header} 1fr ${space.controls};
  grid-template-columns: 1fr;
`

const Main = styled.main`
  grid-row-start: 3;
  height: calc(100vh - ${space.s} - ${space.header} - ${space.header} - ${space.controls});
  background-color: ${colour.defaultbg};
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
        <Route exact path='/app/core' component={SimulatorContainer} />
      </Main>
      <Route exact path='/app/src' component={MobileControls} />
      <Route exact path='/app/output' component={MobileControls} />
      <Route exact path='/app/core' component={SimulatorControls} />
    </Container>
  </MobileGrid>
)

export default MobileLayout
