import React from 'react'

import './controlButton.css'

const ControlButton = ({ iconClass, action }) => (
  <div className='control'>
    <button className={`control-button ${iconClass}`} onClick={action}></button>
  </div>
)

export default ControlButton