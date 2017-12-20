import React from 'react'
import FontAwesome from 'react-fontawesome'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'
import StepControl from './stepControl'
import SpeedControl from './speedControl'

import './simulatorControls.css'

const SimulatorControls = ({
  isRunning,
  isInitialised,
  parseResults,
  init,
  step,
  run,
  pause,
  setProcessRate,
  processRate,
  processRates,
  speedControlHover,
  isSpeedControlHovering }) => (
  <section id="simulatorControlContainer">
    <div id="simulatorControls" className={isInitialised ? `active` : `inactive`}>
      <SpeedControl
        handleClick={setProcessRate}
        processRate={processRate}
        processRates={processRates}
        handleHover={speedControlHover}
        isHovering={isSpeedControlHovering} />
      <PlayPauseControl
        isInitialised={isInitialised}
        isRunning={isRunning}
        handlePlay={run}
        handlePause={pause} />
      <StepControl
        isInitialised={isInitialised}
        handleClick={step} />
      <div className="simulatorControl">
        <FontAwesome name="flag-checkered" size="2x"/>
      </div>
      <ResetControl
        parseResults={parseResults}
        isInitialised={isInitialised}
        handleReset={init} />
    </div>
  </section>
)


export default SimulatorControls