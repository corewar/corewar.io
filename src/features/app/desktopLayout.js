import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import AppContainer from './appContainer'
import NotificationContainer from '../notifications/notificationContainer'

import { colour, space } from '../common/theme'

const DesktopGrid = styled.div`
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

const DesktopLayout = () => (
  <DesktopGrid>
    <NotificationContainer />
    <Route path='/app/src' component={AppContainer} />
    <Route path='/app/output' component={AppContainer} />
    <Route path='/app/core' component={AppContainer} />
  </DesktopGrid>
)

export default DesktopLayout