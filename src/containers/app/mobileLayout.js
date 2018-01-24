import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../../components/app/siteHeader'

import Container from '../../components/styledComponents/mobile/container'
import NavBar from '../../components/styledComponents/mobile/navBar'
import Main from '../../components/styledComponents/mobile/main'
import Controls from '../../components/styledComponents/mobile/controls'
import TabLink from '../../components/styledComponents/tabLink'
import Button from '../../components/styledComponents/button'

import InputInterface from '../../components/app/inputInterface'
import OutputInterface from '../../components/app/outputInterface'

import Octicon from 'react-octicon'

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const MobileLayout = () => (
  <MobileGrid>
    <SiteHeader isAuthenticated={false}/>
    <Container>
      <NavBar>
        <TabLink to='/src'>src</TabLink>
        <TabLink to='/output'>output</TabLink>
        <TabLink to='/core'>core</TabLink>
      </NavBar>
      <Main>
        <Route exact path='/' component={InputInterface} />
        <Route exact path='/src' component={InputInterface} />
        <Route exact path='/output' component={OutputInterface} />
        <Route exact path='/core' component={OutputInterface} />
      </Main>
      <Controls>
        <Button
          handleClick={() => { console.log('disabled clicked me') }} disabled>
          <Octicon mega name="issue-opened"/>
        </Button>
        <Button
          handleClick={() => { console.log('clicked me') }}>
          <Octicon mega name="chevron-right"/>
        </Button>
      </Controls>
    </Container>
  </MobileGrid>
)

export default MobileLayout
