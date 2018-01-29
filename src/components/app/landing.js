import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../../styles/theme'

const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colour.white};
  height: 100vh;
  width: 100vw;
  font-size: ${font.xxlarge};
  font-weight: 200;

  span {
    font-weight: 300;
  }

  .octicon {
    font-size: ${font.xxlarge};
    color: ${colour.blue};
    margin: ${space.xl};
    padding-left: ${space.l};
  }
`

const SuperButton = styled.button`
  font-family: ${font.code};
  font-size: ${font.large};
  padding: ${space.m};
  border: 1px solid ${colour.white};
  border-radius: ${space.xl};
  background: transparent;
  color: ${colour.white};
  width: 300px;
  height: 80px;

  &:hover {
    cursor: pointer;
  }
`

const Landing = ({ history }) => (
  <LandingWrapper>
    <h1>corewar<span>.io</span></h1>
    <Octicon name="chevron-down" />
    <SuperButton onClick={() => history.push('/app')}>play</SuperButton>
  </LandingWrapper>
)

export default Landing