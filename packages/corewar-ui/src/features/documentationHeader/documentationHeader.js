import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const Hero = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: ${font.xxlarge};
  ${media.phone`font-size: ${font.xlarge}`}
  font-weight: 200;
  margin-top: ${space.m};
  margin-left: ${space.xl};
  margin-right: ${space.xl};

  span {
    font-weight: 300;
  }

  .octicon {
    font-size: ${font.xxlarge};
    ${media.tablet`font-size: ${font.xlarge};`}
    color: ${colour.blue};
    margin-left: ${space.l};
    padding-top: ${space.m};
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const HeroLogo = () => (
  <Hero>
    <Logo>
      <h1>
        corewar<span>.docs</span>
      </h1>
      <Octicon name="chevron-right" />
    </Logo>
  </Hero>
)

export default HeroLogo
