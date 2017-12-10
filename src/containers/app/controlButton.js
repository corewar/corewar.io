import React from 'react'
import FontAwesome from 'react-fontawesome'

import './controlButton.css'

const ControlButton = ({ iconClass, handleClick }) => (
  <div className='control'>
    <div className='control-button'>
      <FontAwesome name={iconClass} size="2x" onClick={() => handleClick()}/>
    </div>
  </div>
)

export default ControlButton