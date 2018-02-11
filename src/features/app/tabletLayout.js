import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import ParserInterface from '../parser/combinedContainer'
import SimulatorContainer from '../simulator/simulatorContainer'
import SimulatorControls from '../simulator/controlsContainer'
import ParserControls from '../parser/controlsContainer'

import { colour, space } from '../common/theme'
import simulatorContainer from '../simulator/simulatorContainer';

const TabletGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr ${space.controls};
  grid-template-columns: 1fr;
`

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    console.log(props)
    return <Component {...props}/>
  }}/>
)

// const Main = styled.main`
//   height: calc(100vh - ${space.controls} - ${space.header});
//   background-color: ${colour.defaultbg};
// `

const TabletLayout = (props) => (
  <TabletGrid>
    <Route exact path='/app/src' component={ParserInterface} />
    <Route exact path='/app/output' component={ParserInterface} />
    <Route exact path='/app/core' render={() => <SimulatorContainer tablet />} />
  </TabletGrid>
)

export default TabletLayout