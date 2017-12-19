import React from 'react'
import FontAwesome from 'react-fontawesome'

const StepControl = ({ handleClick }) => (
  <div className="simulatorControl"  onClick={handleClick}>
    <FontAwesome name="step-forward" size="2x"/>
  </div>
)

export default StepControl