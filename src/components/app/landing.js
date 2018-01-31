import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../../styles/theme'

import ChipHead from '../../img/corewarx12.gif'

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: ${space.xl} 1fr 1fr ${space.xl};
  color: ${colour.white};
  font-size: ${font.large};
`

const LandingWrapper = styled.div`

  grid-row-start: 2;
  grid-columns: 2 / 4;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin: ${space.l};

  &:hover {
    cursor: pointer;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Intro = styled.section`
  grid-row-start: 3;
  grid-column: 2 / 4;
  height: 100vh;

  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 1fr;
`

const CenterHeader = styled.h2`
  grid-column: 1 / 3;
  font-size: ${font.xlarge};
  font-family: ${font.code};
  text-align: center;
`

const PrimaryIntro = styled.p`
  margin-top: ${space.xl};
  font-weight: 200;
  line-height: 1.3em;
`

const PrimaryImage = styled.img`
  width: 422px;
  height: 472px;

  -moz-box-shadow:    inset 0 0 50px #000000;
  -webkit-box-shadow: inset 0 0 50px #000000;
  box-shadow:         inset 0 0 50px #000000;
`

const Landing = ({ history }) => (
  <PageWrapper>
    <LandingWrapper>
      <h1>corewar<span>.io</span></h1>
      <Octicon name="chevron-down" />
      <ButtonWrapper>
        <SuperButton onClick={() => history.push('/app/src')}>play</SuperButton>
        <SuperButton>learn</SuperButton>
      </ButtonWrapper>
    </LandingWrapper>
    <Intro>
        <CenterHeader>What is Corewar?</CenterHeader>
        <PrimaryIntro>
          Core War is a game played between two or more programs written in Redcode,
          a low-level language similar to assembly.
          <br/>
          <br/>
          Players write a program to eliminate all opponents in the memory of the MARS virtual computer.
          <br/>
          <br/>
          Core War can also be used as a platform to experiment with genetic programming.
        </PrimaryIntro>
        <PrimaryImage src={ChipHead} />
      </Intro>
  </PageWrapper>
)

export default Landing