import React from 'react'
import FontAwesome from 'react-fontawesome'

import './parseIcon.css'

const ParseIcon = ({ success }) => (

  <div className={`parse-icon`}>
    {
      success ?
      <FontAwesome name='check' size='2x' /> :
      <FontAwesome className='error' name='times' size='2x' />
    }
  </div>

)

export default ParseIcon