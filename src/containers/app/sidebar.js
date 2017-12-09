import React from 'react'

import ControlButton from './controlButton'

import './sidebar.css'

const Sidebar = () => (
  <aside id="sidebar">
    <ControlButton iconClass={`save`} />
    <ControlButton iconClass={`panel`} />
    <ControlButton iconClass={`delete`} />
  </aside>
)

export default Sidebar;