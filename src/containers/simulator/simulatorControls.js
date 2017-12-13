import React from 'react'
import FontAwesome from 'react-fontawesome'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'
import StepControl from './stepControl'

import './simulatorControls.css'


const SimulatorControls = ({ isRunning, isInitialised, parseResults, init, step, run, pause }) => (
  <section id="simulatorControlContainer">
    <div id="simulatorControls" className={isInitialised ? `active` : `inactive`}>
      <div className="simulatorControl">
        <FontAwesome name="backward" size="2x"/>
      </div>
      <PlayPauseControl isRunning={isRunning} handlePlay={run} handlePause={pause} />
      <div className="simulatorControl">
        <FontAwesome name="forward" size="2x"/>
      </div>
      <StepControl handleClick={step}/>
      <div className="simulatorControl">
        <FontAwesome name="flag-checkered" size="2x"/>
      </div>
      <ResetControl parseResults={parseResults} isInitialised={isInitialised} handleReset={init} />
    </div>
  </section>
)


export default SimulatorControls