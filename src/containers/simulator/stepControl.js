import React from 'react'
import FontAwesome from 'react-fontawesome'

const StepControl = ({ handleClick }) => (
  <div className="simulatorControl">
    <FontAwesome name="step-forward" size="2x" onClick={() => handleClick()}/>
  </div>
)

export default StepControl