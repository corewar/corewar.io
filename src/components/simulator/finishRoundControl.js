import React from 'react'
import FontAwesome from 'react-fontawesome'

const FinishRoundControl = ({ isInitialised, handleFinish }) => (
  <div className="simulatorControl"  onClick={isInitialised ? handleFinish : null}>
    <span className="tooltip">{`finish round`}</span>
    <FontAwesome name={`flag-checkered`} size="2x" />
  </div>
)

export default FinishRoundControl