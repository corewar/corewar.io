import React from 'react'
import TabLink from './tabLink'

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
  <div className="flex row-start-2 text-center ml-12">
    {navigationData[interfaceMode].map(link => (
      <TabLink key={link.url} to={link.url}>
        {link.text}
      </TabLink>
    ))}
  </div>
)

export default NavBar
