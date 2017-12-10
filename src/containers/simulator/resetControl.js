import React from 'react'
import FontAwesome from 'react-fontawesome'

const ResetControl = ({ isInitialised, handleReset }) => (
  <div className="simulatorControl">
    <FontAwesome className={`active`} name="undo" size="2x" onClick={handleReset} />
  </div>
)

export default ResetControl