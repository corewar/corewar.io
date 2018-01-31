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
      <Route path='/app/src' component={CompleteInterface} />
      <Route path='/app/output' component={CompleteInterface} />
      <Route path='/app/core' component={CompleteInterface} />
    </Main>
  </DesktopGrid>
)

export default DesktopLayout