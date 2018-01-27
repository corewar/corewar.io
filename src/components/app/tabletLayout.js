import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './siteHeader'
import ParserInterface from '../../containers/app/parserInterface'
import Main from '../styledComponents/tablet/main'
import CoreContainer from '../../containers/simulator/coreContainer'

const TabletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
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