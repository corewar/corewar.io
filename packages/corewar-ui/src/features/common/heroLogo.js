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

const Feature = styled.div`
  border-right: 1px solid ${colour.lightbg};
  ${media.tablet`border-right: none;`};
  ${media.desktop`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg}; padding-bottom: ${space.l};`};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${space.l};
  ${media.desktop`margin-top: ${space.s};`};

  :first-child {
    .octicon {
      color: ${colour.warrior[1]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  :last-child {
    border: none;

    .octicon {
      color: ${colour.warrior[4]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  .octicon {
    font-size: ${font.large};
    color: ${colour.warrior[2]};
    margin: 0;
  }

  h3 {
    margin: ${space.m};
    ${media.tablet`margin: ${space.s}`};
    font-size: ${font.base};
    font-weight: 300;
    color: ${colour.lightgrey};
    text-align: center;
  }

  p {
    color: ${colour.blue};
    font-family: ${font.code};
    line-height: 1.5em;
    font-size: ${font.base};
    padding: ${space.m};
    text-align: center;
    margin-left: ${space.xl};
    margin-right: ${space.xl};

    ${media.desktop`margin-left: ${space.s};`};
    ${media.desktop`margin-right: ${space.s};`};
  }

  :hover {
    .guidance {
      opacity: 1;
      transition: 0.5s;
    }
  }

  ul {
    margin: ${space.m};

    li {
      margin: ${space.s};
      font-weight: 300;
      line-height: ${font.large};

      .octicon {
        font-size: ${font.base};
        margin-right: ${space.m};
        color: ${colour.white};
      }
    }
  }
`

const HeroLogo = () => (
  <Hero>
    <Logo>
      <h1>
        corewar<span>.io</span>
      </h1>
      <Octicon name="chevron-right" />
    </Logo>
    <section className="hidden md:flex flex-row flex-wrap justify-center ml-16">
      <Feature>
        <Octicon name="rocket" />
        <h3>Play corewar</h3>
      </Feature>
      <Feature>
        <Octicon name="device-mobile" />
        <h3>On any device</h3>
      </Feature>
      <Feature>
        <Octicon name="megaphone" />
        <h3>In new ways</h3>
      </Feature>
    </section>
  </Hero>
)

export default HeroLogo
