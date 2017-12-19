import React from 'react'
import FontAwesome from 'react-fontawesome'

const FastForwardControl = ({ handleClick }) => (
  <div className="simulatorControl" onClick={handleClick}>
    <FontAwesome className={`active`} name="forward" size="2x"/>
  </div>
)

export default FastForwardControl