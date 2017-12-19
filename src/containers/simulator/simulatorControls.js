import React from 'react'
import FontAwesome from 'react-fontawesome'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'
import StepControl from './stepControl'
import FastForwardControl from './fastForwardControl'
import RewindControl from './rewindControl'

import './simulatorControls.css'


const SimulatorControls = ({ isRunning, isInitialised, parseResults, init, step, run, pause, incrementProcessRate, decrementProcessRate }) => (
  <section id="simulatorControlContainer">
    <div id="simulatorControls" className={isInitialised ? `active` : `inactive`}>
      <RewindControl handleClick={decrementProcessRate}/>
      <PlayPauseControl isRunning={isRunning} handlePlay={run} handlePause={pause} />
      <FastForwardControl handleClick={incrementProcessRate}/>
      <StepControl handleClick={step}/>
      <div className="simulatorControl">
        <FontAwesome name="flag-checkered" size="2x"/>
      </div>
      <ResetControl parseResults={parseResults} isInitialised={isInitialised} handleReset={init} />
    </div>
  </section>
)


export default SimulatorControls