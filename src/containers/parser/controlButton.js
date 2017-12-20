import React from 'react'
import FontAwesome from 'react-fontawesome'

import './controlButton.css'

const ControlButton = ({ iconClass, tooltipText, handleClick, enabled }) => (
  <div className='control'>
    <span className="tooltip">{tooltipText}</span>
    <div className='control-button' onClick={enabled ? handleClick : null}>
      <FontAwesome name={iconClass} size='2x' />
    </div>
  </div>
)

export default ControlButton