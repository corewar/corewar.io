import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import AppContainer from './appContainer'

import { colour, space } from '../common/theme'

const DesktopGrid = styled.div`
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

const DesktopLayout = () => (
  <DesktopGrid>
    <Route path="/app/editor/src" component={AppContainer} />
    <Route path="/app/editor/output" component={AppContainer} />
    <Route path="/app/editor/core" component={AppContainer} />
    <Route path="/app/player/config" component={AppContainer} />
    <Route path="/app/player/results" component={AppContainer} />
    <Route path="/app/player/core" component={AppContainer} />
  </DesktopGrid>
)

export default DesktopLayout
