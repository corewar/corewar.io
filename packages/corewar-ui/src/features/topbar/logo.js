import React from 'react'
import PropTypes from 'prop-types'

import CorewarLogo from '../../img/corewar-logo.png'

const Logo = ({ siteName, siteDomain }) => (
  <a className="flex" href={`/`}>
    <img className="w-8 h-8 m-2" src={CorewarLogo} alt="corewar-logo" />
    <div className="flex font-body text-xl text-blue font-light leading-5 pl-4 cursor-pointer items-center">
      {siteName}
      <span className="font-medium text-white">{siteDomain}</span>
    </div>
  </a>
)

Logo.propTypes = {
  siteName: PropTypes.string,
  siteDomain: PropTypes.string
}

export default Logo
