import React from 'react'
import styled from 'styled-components'

import TabLink from '../common/tabLink'

const NavBarGrid = styled.div`
  grid-row-start: 2;
  display: flex;
  text-align: center;
`

const NavBar = () => (
  <NavBarGrid>
    <TabLink to='/app/src'>source</TabLink>
    <TabLink to='/app/output'>output</TabLink>
    <TabLink to='/app/core'>core</TabLink>
  </NavBarGrid>
)

export default NavBar