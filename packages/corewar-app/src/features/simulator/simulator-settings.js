import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCoreOptions } from '../../services/core-options'
import { setCoreOptions } from './actions'
import { getSimulatorState } from './reducer'

const SimulatorSettings = () => {
  const { coreOptions } = useSelector(getSimulatorState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="bg-gray-700 p-4">
      <div className="">
        <h3 className="text-lg font-bold mt-2 mb-6 text-gray-500" id="modal-headline">
          Simulator settings
        </h3>
        <ul>
          {coreOptions.map((opt) => {
            const options = getCoreOptions(opt.id)
            return (
              <li
                key={opt.id}
                className="flex flex-col my-2 p-2 w-full text-sm rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600"
                onClick={() => {
                  dispatch(setCoreOptions(opt.id))
                  navigate(-1)
                }}
              >
                <p className="font-bold">{opt.name}</p>
                <div className="flex flex-row flex-wrap text-sm">
                  <span className="w-1/3">Core size {options.coreSize}</span>
                  <span className="w-1/3">Max cycles {options.maximumCycles}</span>
                  <span className="w-1/3">Instruction limit {options.instructionLimit}</span>
                  <span className="w-1/3">Max tasks {options.maxTasks}</span>
                  <span className="w-1/3">Min separation {options.minSeparation}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SimulatorSettings
