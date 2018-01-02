import React from 'react'
import FontAwesome from 'react-fontawesome'

const StepControl = ({ isInitialised, isRunning, handleClick }) => (
  <div className="simulatorControl"  onClick={isInitialised && !isRunning ? handleClick : null}>
    <span className="tooltip">step</span>
    <FontAwesome name="step-forward" size="2x"/>
  </div>
)

export default StepControl