import React from 'react'
import { NavLink } from 'react-router-dom'

const Tab = ({ route }) => {
  return (
    <NavLink
      exact
      to={route.to}
      activeClassName="bg-gray-800"
      className={`flex items-center justify-center w-32 h-12 border border-b-0 border-gray-700 rounded-lg rounded-b-none text-sm font-semibold text-gray-100`}
    >
      {route.name}
    </NavLink>
  )
}

export default Tab
