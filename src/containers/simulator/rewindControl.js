import React from 'react'
import FontAwesome from 'react-fontawesome'

const RewindControl = ({ handleClick }) => (
  <div className="simulatorControl" onClick={handleClick}>
    <FontAwesome className={`active`} name="backward" size="2x"/>
  </div>
)

export default RewindControl