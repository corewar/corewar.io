import React from 'react'
import FontAwesome from 'react-fontawesome'

const ResetControl = ({ isInitialised, handleReset, parseResults }) => (
  <div className="simulatorControl" onClick={isInitialised ? handleReset : null}>
    <span className="tooltip">reset</span>
    <FontAwesome name="undo" size="2x" />
  </div>
)

export default ResetControl