import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../../components/app/siteHeader'
import ParserInterface from '../../components/app/parserInterface'
import TabletCore from '../../containers/simulator/tabletCore'
import Main from '../../components/styledComponents/tablet/main'

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
      <Route exact path='/core' component={TabletCore} />
    </Main>
  </TabletGrid>
)

export default TabletLayout