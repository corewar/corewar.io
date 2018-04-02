import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../navbar/navbar'

import InputContainer from '../parser/inputContainer'
import OutputContainer from '../parser/outputContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import NotificationContainer from '../notifications/notificationContainer'

import { space } from '../common/theme'

const MobileGrid = styled.div`
  display: grid;
  grid-template-rows: ${space.s} ${space.header} 1fr;
  grid-template-columns: 1fr;
  min-width: 450px;
`

const MobileLayout = () => (
  <MobileGrid>
    <NavBar />
    <NotificationContainer />
    <Route exact path='/app/src' component={InputContainer} />
    <Route exact path='/app/output' component={OutputContainer} />
    <Route exact path='/app/core' render={() => <SimulatorContainer mobile />} />
  </MobileGrid>
)

export default MobileLayout
