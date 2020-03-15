import React from 'react'
import PropTypes from 'prop-types'

import CorewarLogo from '../../img/corewar-logo.png'

const Logo = ({ siteName, siteDomain }) => (
  <a className="flex" href={`/`}>
    <img className="m-4 w-12" src={CorewarLogo} alt="corewar-logo" />
    <div className="font-body text-xl text-blue font-light leading-5 pl-4 pt-2 cursor-pointer">
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
