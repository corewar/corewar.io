import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as PlayIcon } from '../../img/icons/play-circle-outline.svg'
import { ReactComponent as PauseIcon } from '../../img/icons/pause-circle-outline.svg'
import { ReactComponent as StepIcon } from '../../img/icons/play-skip-forward-outline.svg'
import { ReactComponent as ReloadIcon } from '../../img/icons/refresh-outline.svg'
import { ReactComponent as SettingsIcon } from '../../img/icons/settings-outline.svg'
import SimulatorSpeed from './simulator-speed'
import ModalLink from '../../app-chrome/modal-link'
import { init, step, run, pause } from './actions'
import { getSimulatorState } from './reducer'

const SimulatorButton = ({ enabled = true, visible = true, clickHandler, children }) =>
  visible ? (
    <button
      className={`${
        enabled ? `cursor-pointer hover:bg-gray-700 rounded` : `cursor-not-allowed`
      } p-2`}
      onClick={enabled ? clickHandler : null}
    >
      {children}
    </button>
  ) : null

const SimulatorControls = () => {
  const dispatch = useDispatch()
  const { isRunning, isInitialised } = useSelector(getSimulatorState)
  return (
    <div className="max-w-core mb-2 flex justify-evenly items-center text-gray-100">
      <SimulatorButton
        clickHandler={() => dispatch(run())}
        visible={!isRunning}
        enabled={isInitialised}
      >
        <PlayIcon className={`stroke-current h-12 w-12`}></PlayIcon>
      </SimulatorButton>

      <SimulatorButton
        clickHandler={() => dispatch(pause())}
        visible={isRunning}
        enabled={isRunning}
      >
        <PauseIcon className={`stroke-current h-12 w-12`}></PauseIcon>
      </SimulatorButton>

      <SimulatorButton clickHandler={() => dispatch(step())} enabled={isInitialised && !isRunning}>
        <StepIcon className="stroke-current h-6 w-6"></StepIcon>
      </SimulatorButton>

      <SimulatorButton clickHandler={() => dispatch(init())} enabled={isInitialised}>
        <ReloadIcon className="stroke-current h-6 w-6"></ReloadIcon>
      </SimulatorButton>

      <SimulatorSpeed />

      <ModalLink id="simulator-settings" className="hover:bg-gray-700 rounded p-2">
        <SettingsIcon className="stroke-current h-6 w-6"></SettingsIcon>
      </ModalLink>
    </div>
  )
}

export default SimulatorControls
