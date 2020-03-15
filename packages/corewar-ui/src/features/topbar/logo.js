import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { space } from '../common/theme'

import CorewarLogo from '../../img/corewar-logo.png'

const Wrapper = styled.a`
  display: grid;
  grid-template-columns: ${space.header} 1fr;
`

const LogoImage = styled.img`
  margin: ${space.s};
  width: calc(${space.header} - ${space.ss} - ${space.s});
  height: calc(${space.header} - ${space.s} - ${space.s});
`

const Logo = ({ siteName, siteDomain }) => (
  <Wrapper href={`/`}>
    <LogoImage src={CorewarLogo} />
    <div className="font-body text-xl text-blue font-light leading-5 pl-4 pt-2 cursor-pointer">
      {siteName}
      <span className="font-medium text-white">{siteDomain}</span>
    </div>
  </Wrapper>
)

Logo.propTypes = {
  siteName: PropTypes.string,
  siteDomain: PropTypes.string
}

export default Logo
