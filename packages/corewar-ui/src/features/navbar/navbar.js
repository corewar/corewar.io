import React from 'react'
import styled from 'styled-components'
import { space } from '../common/theme'
import TabLink from './tabLink'

const NavBarGrid = styled.div`
  grid-row-start: 2;
  margin-left: ${space.sidebar};
  display: flex;
  text-align: center;
`

const navigationData = {
  EDITOR: [
    { url: '/app/editor/src', text: 'source' },
    { url: '/app/editor/output', text: 'output' },
    { url: '/app/editor/core', text: 'core' }
  ],
  PLAYER: [
    { url: '/app/player/config', text: 'config' },
    { url: '/app/player/results', text: 'results' },
    { url: '/app/player/core', text: 'core' }
  ]
}

const NavBar = ({ interfaceMode }) => (
  <NavBarGrid>
    {navigationData[interfaceMode].map(link => (
      <TabLink key={link.url} to={link.url}>
        {link.text}
      </TabLink>
    ))}
  </NavBarGrid>
)

NavBarGrid.displayName = 'NavBarGrid'

export default NavBar
