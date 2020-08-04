import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SpeedIcon } from '../../img/icons/speedometer-outline.svg'
import { setProcessRate } from './actions'
import { getSimulatorState } from './reducer'

const SimulatorSettings = () => {
  const [menuOpen, toggleMenu] = useState(false)
  const dispatch = useDispatch()
  const { processRate, processRates } = useSelector(getSimulatorState)
  return (
    <div className="relative">
      <button className="mr-2" onClick={() => toggleMenu(!menuOpen)}>
        <SpeedIcon className="h-6 w-6" />
      </button>
      {menuOpen ? (
        <ul className="absolute z-10 top-0 right-0 mt-8 p-2 text-base rounded-lg bg-gray-800 shadow-md">
          {processRates.map(rate => (
            <li
              className={`py-1 px-2 w-full cursor-pointer hover:bg-gray-700 rounded-lg font-normal text-right ${
                processRate === rate ? 'bg-gray-700' : ''
              }`}
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
