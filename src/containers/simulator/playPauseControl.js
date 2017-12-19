import React from 'react'
import FontAwesome from 'react-fontawesome'


const PlayPauseControl = ({ isRunning, handlePlay, handlePause }) => (
  <div className="simulatorControl"  onClick={isRunning? handlePause : () => handlePlay(100)}>
    {isRunning ?
      <FontAwesome name="pause" size="2x" /> :
      <FontAwesome name="play" size="2x" />
    }
  </div>
)

export default PlayPauseControl