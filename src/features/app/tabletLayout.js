import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import ParserContainer from '../parser/combinedContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import NotificationContainer from '../notifications/notificationContainer'

const TabletGrid = styled.div`
  height: calc(100vh - 48px);
`

const TabletLayout = (props) => (
  <TabletGrid>
    <NotificationContainer />
    <Route exact path='/app/src' component={ParserContainer} />
    <Route exact path='/app/output' component={ParserContainer} />
    <Route exact path='/app/core' render={() => <SimulatorContainer tablet />} />
  </TabletGrid>
)

export default TabletLayout