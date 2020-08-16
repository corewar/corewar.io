import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSimulatorState } from './reducer'
import { setCoreOptions } from './actions'
import { getCoreOptions } from '../../services/core-options'

const SimulatorSettings = () => {
  const { coreOptions } = useSelector(getSimulatorState)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className="bg-gray-700 p-4">
      <div className="">
        <h3 className="text-lg font-bold mt-2 mb-6 text-gray-500" id="modal-headline">
          Simulator settings
        </h3>
        <ul>
          {coreOptions.map(opt => {
            const options = getCoreOptions(opt.id)
            return (
              <li
                key={opt.id}
                className="flex items-center my-4 p-4 w-full text-sm rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600"
                onClick={() => {
                  dispatch(setCoreOptions(opt.id))
                  history.goBack()
                }}
              >
                {opt.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SimulatorSettings
