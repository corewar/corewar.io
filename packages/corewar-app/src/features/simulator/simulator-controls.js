import React from 'react'
import { ReactComponent as PlayIcon } from '../../img/icons/play-circle-outline.svg'
import { ReactComponent as StepIcon } from '../../img/icons/play-skip-forward-outline.svg'
import { ReactComponent as ReloadIcon } from '../../img/icons/refresh-outline.svg'
import { ReactComponent as SpeedIcon } from '../../img/icons/speedometer-outline.svg'
import { ReactComponent as SettingsIcon } from '../../img/icons/settings-outline.svg'

const SimulatorControls = () => (
  <div className="h-16 max-w-core mt-2 flex justify-evenly items-center text-gray-100">
    <PlayIcon className="stroke-current h-12 w-12"></PlayIcon>
    <StepIcon className="stroke-current h-6 w-6"></StepIcon>
    <ReloadIcon className="stroke-current h-6 w-6"></ReloadIcon>
    <SpeedIcon className="stroke-current h-6 w-6"></SpeedIcon>
    <SettingsIcon className="stroke-current h-6 w-6"></SettingsIcon>
  </div>
)

export default SimulatorControls
