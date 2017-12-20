import React from 'react'
import FontAwesome from 'react-fontawesome'

const StepControl = ({ isInitialised, handleClick }) => (
  <div className="simulatorControl"  onClick={isInitialised ? handleClick : null}>
    <span className="tooltip">step</span>
    <FontAwesome name="step-forward" size="2x"/>
  </div>
)

export default StepControl