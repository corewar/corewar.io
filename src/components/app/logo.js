import React from 'react'
import PropTypes from 'prop-types'

import './logo.css'

const Logo = ({ logoText }) => {
  return <div className="logo">{logoText}</div>
}

Logo.PropTypes = {
  logoText: PropTypes.string.isRequired
}

export default Logo