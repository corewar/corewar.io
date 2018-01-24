import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../../components/app/siteHeader'
import CompleteInterface from '../../components/app/completeInterface'
import Main from '../../components/styledComponents/desktop/main'

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const DesktopLayout = () => (
  <DesktopGrid>
    <SiteHeader isAuthenticated={false}/>
    <Main>
      <Route exact path='/' component={CompleteInterface} />
      <Route exact path='/src' component={CompleteInterface} />
      <Route exact path='/output' component={CompleteInterface} />
      <Route exact path='/core' component={CompleteInterface} />
    </Main>
  </DesktopGrid>
)

export default DesktopLayout