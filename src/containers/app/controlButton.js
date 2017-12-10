import React from 'react'
import FontAwesome from 'react-fontawesome'

import './controlButton.css'

const ControlButton = ({ iconClass, action }) => (
  <div className='control'>
    <div className='control-button'>
      <FontAwesome name={iconClass} size="2x" onClick={action}/>
    </div>
  </div>
)

export default ControlButton