import React from 'react'
import { ReactComponent as Logo } from '../img/logo.svg'

const Header = () => (
  <header className="w-full h-12 flex flex-row items-center">
    <Logo title="corewar logo" />
    <span className="ml-4 text-lg">
      <span className="font-medium">corewar</span>.io
    </span>
  </header>
)

export default Header
