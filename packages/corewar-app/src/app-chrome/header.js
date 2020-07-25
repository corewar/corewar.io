import React from 'react'
import { ReactComponent as Logo } from '../img/logo.svg'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="w-full h-12 pl-4 flex flex-row items-center">
    <Link to="/" className="flex">
      <Logo title="corewar logo" className="w-6 h-6" />
      <span className="ml-4 text-lg">
        <span className="font-medium">corewar</span>.io
      </span>
    </Link>
  </header>
)

export default Header
