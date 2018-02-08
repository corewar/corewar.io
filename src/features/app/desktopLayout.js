import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import AppContainer from './appContainer'

import { colour, space } from '../common/theme'

const Main = styled.main`
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

const DesktopLayout = () => (
  <Main>
    <Route path='/app/src' component={AppContainer} />
    <Route path='/app/output' component={AppContainer} />
    <Route path='/app/core' component={AppContainer} />
  </Main>
)

export default DesktopLayout