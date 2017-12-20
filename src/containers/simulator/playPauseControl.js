import React from 'react'
import FontAwesome from 'react-fontawesome'

const PlayPauseControl = ({ isRunning, handlePlay, handlePause }) => (
  <div className="simulatorControl"  onClick={isRunning ? handlePause : handlePlay}>
    <span className="tooltip">{isRunning ? `pause` : `play`}</span>
    <FontAwesome name={isRunning ? `pause` : `play`} size="2x" />
  </div>
)

export default PlayPauseControl