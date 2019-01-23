import React from 'react'
import styled from 'styled-components'
import { space } from '../common/theme'
import TabLink from '../common/tabLink'

const NavBarGrid = styled.div`
  grid-row-start: 2;
  margin-left: ${space.sidebar};
  display: flex;
  text-align: center;
`

const NavBar = () => (
  <NavBarGrid>
    <TabLink to="/app/player/config">config</TabLink>
    <TabLink to="/app/player/results">results</TabLink>
    <TabLink to="/app/player/core">core</TabLink>
  </NavBarGrid>
)

NavBarGrid.displayName = 'NavBarGrid'

export default NavBar
