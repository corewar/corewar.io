import React from 'react'
import FontAwesome from 'react-fontawesome'

const PlayPauseControl = ({ isInitialised, isRunning, handlePlay, handlePause }) => (
  <div className="simulatorControl"  onClick={isInitialised ? isRunning ? handlePause : handlePlay : null}>
    <span className="tooltip">{isRunning ? `pause` : `play`}</span>
    <FontAwesome name={isRunning ? `pause` : `play`} size="2x" />
  </div>
)

export default PlayPauseControl