import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.xxlarge};
  ${media.phone`font-size: ${font.xlarge}`}
  font-weight: 200;
  margin-top: ${space.m};

  border-bottom: 1px solid ${colour.lightbg};
  margin-left: ${space.xl};
  margin-right: ${space.xl};

  span {
    font-weight: 300;
  }

  .octicon {
    font-size: ${font.xxlarge};
    ${media.tablet`font-size: ${font.xlarge};`}
    color: ${colour.blue};
    margin: ${space.l};
    margin-bottom: ${space.s};
    padding-left: ${space.l};
  }

`

const HeroLogo = () => (
  <Hero>
    <h1>corewar<span>.io</span></h1>
    <Octicon name='chevron-down' />
  </Hero>
)

export default HeroLogo