import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../navbar/navbar'

import InputContainer from '../parser/inputContainer'
import OutputInterface from '../parser/outputContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import ParserControls from '../parser/controlsContainer'
import SimulatorControls from '../simulator/controlsContainer'

import { colour, space } from '../common/theme'

const MobileGrid = styled.div`
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
    <NavBar />
    <Main>
      <Route exact path='/app/src' component={InputContainer} />
      <Route exact path='/app/output' component={OutputInterface} />
      <Route exact path='/app/core' component={SimulatorContainer} />
    </Main>
    <Route exact path='/app/src' component={ParserControls} />
    <Route exact path='/app/output' component={ParserControls} />
    <Route exact path='/app/core' component={SimulatorControls} />
  </MobileGrid>
)

export default MobileLayout
