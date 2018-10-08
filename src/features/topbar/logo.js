import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colour, font, space } from '../common/theme'

import CorewarLogo from '../../img/corewar-logo.png'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: ${space.header} 1fr;
`

const LogoImage = styled.img`
  margin: ${space.xs};
  width: calc(${space.header} - ${space.xs} - ${space.xs});
  height: calc(${space.header} - ${space.xs} - ${space.xs});
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

const Logo = ({ siteName, siteDomain, history }) =>
  <Wrapper onClick={() => history.push(`/`)}>
    <LogoImage src={CorewarLogo} />
    <SiteName>
      {siteName}
      <SiteDomain>{siteDomain}</SiteDomain>
    </SiteName>
  </Wrapper>


Logo.propTypes = {
  siteName: PropTypes.string.isRequired,
  siteDomain: PropTypes.string.isRequired
}

export default Logo