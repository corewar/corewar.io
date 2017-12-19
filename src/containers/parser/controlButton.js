import React from 'react'
import FontAwesome from 'react-fontawesome'

import './controlButton.css'

const ControlButton = ({ iconClass, handleClick }) => (
  <div className='control'>
    <div className='control-button' onClick={handleClick}>
      <FontAwesome name={iconClass} size='2x' />
    </div>
  </div>
)

export default ControlButton