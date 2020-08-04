import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as MenuIcon } from '../../img/icons/ellipsis-horizontal-outline.svg'
import { setProcessRate } from './actions'
import { getSimulatorState } from './reducer'

const SimulatorSettings = () => {
  const [menuOpen, toggleMenu] = useState(false)
  const dispatch = useDispatch()
  const { processRate, processRates } = useSelector(getSimulatorState)
  return (
    <div className="relative">
      <button className="mr-2" onClick={() => toggleMenu(!menuOpen)}>
        <MenuIcon />
      </button>
      {menuOpen ? (
        <ul className="absolute z-10 top-0 right-0 mt-8 w-40 p-2 text-base rounded-lg bg-gray-800 shadow-md">
          {processRates.map(rate => (
            <li
              className="py-1 px-2 w-full cursor-pointer hover:bg-gray-700 rounded-lg font-normal"
              onClick={() => {
                dispatch(setProcessRate(rate))
                toggleMenu(!menuOpen)
              }}
            >
              {rate}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default SimulatorSettings
