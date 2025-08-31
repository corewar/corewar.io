import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { colour, font, space } from '../common/theme'

import CorewarLogo from '../../img/corewar-logo.png'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: ${space.header} 1fr;
`

const LogoImage = styled.img`
  margin: ${space.s};
  width: calc(${space.header} - ${space.ss} - ${space.s});
  height: calc(${space.header} - ${space.s} - ${space.s});
`

const SiteName = styled.div`
  font-family: ${font.default};
  font-size: ${font.large};
  color: ${colour.blue};
  font-weight: 300;
  line-height: 1.2em;
  padding-left: ${space.m};
  padding-top: ${space.s};

  :hover {
    cursor: pointer;
  }
`

SiteName.displayName = 'SiteName'

const SiteDomain = styled.span`
  font-weight: 500;
  color: ${colour.white};
`

const Logo = ({ siteName, siteDomain }) => {
  const navigate = useNavigate()

  return (
    <Wrapper onClick={() => navigate('/')}>
      <LogoImage src={CorewarLogo} />
      <SiteName>
        {siteName}
        <SiteDomain>{siteDomain}</SiteDomain>
      </SiteName>
    </Wrapper>
  )
}

Logo.propTypes = {
  siteName: PropTypes.string.isRequired,
  siteDomain: PropTypes.string.isRequired
}

Logo.defaultProps = {
  siteName: 'corewar',
  siteDomain: '.io'
}

export default Logo
