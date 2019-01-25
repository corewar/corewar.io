import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../navbar/navbar'

import InputContainer from '../parser/inputContainer'
import OutputContainer from '../parser/outputContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import ConfigContainer from '../config/configContainer'
import ResultsContainer from '../results/resultsContainer'

import { space } from '../common/theme'

const MobileGrid = styled.div`
  display: grid;
  grid-template-rows: ${space.s} ${space.header} 1fr;
  grid-template-columns: 100%;
  min-width: 360px;
`

const MobileLayout = ({ interfaceMode }) => (
  <MobileGrid>
    <NavBar interfaceMode={interfaceMode} />
    <Route exact path="/app/editor/src" component={InputContainer} />
    <Route exact path="/app/editor/output" component={OutputContainer} />
    <Route exact path="/app/editor/core" render={() => <SimulatorContainer mobile />} />

    <Route exact path="/app/player/config" component={ConfigContainer} />
    <Route exact path="/app/player/results" component={ResultsContainer} />
    <Route exact path="/app/player/core" render={() => <SimulatorContainer mobile />} />
  </MobileGrid>
)

export default MobileLayout
