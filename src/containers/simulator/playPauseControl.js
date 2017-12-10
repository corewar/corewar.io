import React from 'react'
import FontAwesome from 'react-fontawesome'


const PlayPauseControl = ({ isRunning, handlePlay, handlePause }) => (
  <div className="simulatorControl">
    {isRunning ?
      <FontAwesome name="pause" size="2x" onClick={handlePause} /> :
      <FontAwesome name="play" size="2x" onClick={() => handlePlay(100)}/>
    }
  </div>
)

export default PlayPauseControl