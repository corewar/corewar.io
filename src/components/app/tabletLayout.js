import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'
import ParserInterface from '../../containers/app/parserInterface'
import Main from '../styledComponents/tablet/main'
import CoreContainer from '../../containers/simulator/coreContainer'

import { space } from '../../styles/theme'

const TabletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${space.header} 1fr ${space.controls};
`

const TabletLayout = () => (
  <TabletGrid>
    <SiteHeader isAuthenticated={false}/>
    <Main>
      <Route exact path='/' component={ParserInterface} />
      <Route exact path='/src' component={ParserInterface} />
      <Route exact path='/output' component={ParserInterface} />
      <Route exact path='/core' component={CoreContainer} />
    </Main>
  </TabletGrid>
)

export default TabletLayout