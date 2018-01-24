import React from 'react'
import Media from "react-media"
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './../../components/app/siteHeader'
import ParserInterface from './../../components/app/parserInterface'
import OutputInterface from '../../components/app/outputInterface'

import { sizes } from '../../styles/mediaQuery'

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const TabletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const App = () => (
  <div>
    <Media
      query={{ maxWidth: sizes.phone }}
      render={() => <MobileLayout />}
    />

    <Media
      query={{ maxWidth: sizes.desktop }}
      render={() => <TabletLayout />}
    />
  </div>
)

const MobileLayout = () => (
  <MobileGrid>
    <SiteHeader isAuthenticated={false}/>
    <main>
      <Route exact path='/' component={ParserInterface} />
      <Route exact path='/src' component={ParserInterface} />
      <Route exact path='/output' component={OutputInterface} />
      <Route exact path='/core' component={ParserInterface} />
    </main>
  </MobileGrid>
)

const TabletLayout = () => (
  <TabletGrid>
    <SiteHeader isAuthenticated={false}/>
    <main>
      <Route exact path='/' component={ParserInterface} />
      <Route exact path='/src' component={ParserInterface} />
      <Route exact path='/core' component={ParserInterface} />
    </main>
  </TabletGrid>
)

export default App
