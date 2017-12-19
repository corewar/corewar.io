import React from 'react'
import FontAwesome from 'react-fontawesome'

const ResetControl = ({ isInitialised, handleReset, parseResults }) => (
  parseResults.length > 0 &&
  <div className="simulatorControl" onClick={handleReset}>
    <FontAwesome className={`active`} name="undo" size="2x" />
  </div>
)

export default ResetControl