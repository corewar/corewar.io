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
      className={`${enabled ? `cursor-pointer` : `text-gray-400 cursor-not-allowed`}`}
      onClick={enabled ? clickHandler : null}
    >
      {children}
    </button>
  ) : null

const SimulatorControls = () => {
  const dispatch = useDispatch()
  const { isRunning, isInitialised } = useSelector(getSimulatorState)
  return (
    <div className="h-16 max-w-core mt-2 flex justify-evenly items-center text-gray-100">
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

      <ModalLink id="simulator-settings">
        <SettingsIcon className="stroke-current h-6 w-6"></SettingsIcon>
      </ModalLink>
    </div>
  )
}

export default SimulatorControls
