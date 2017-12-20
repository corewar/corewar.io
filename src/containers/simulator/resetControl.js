import React from 'react'
import FontAwesome from 'react-fontawesome'

const ResetControl = ({ isInitialised, handleReset, parseResults }) => (
  <div className="simulatorControl" onClick={handleReset}>
    <span className="tooltip">reset</span>
    <FontAwesome className={`active`} name="undo" size="2x" />
  </div>
)

export default ResetControl