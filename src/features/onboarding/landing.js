import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import scrollToComponent from 'react-scroll-to-component'

import { colour, font, space } from '../common/theme'

import Simulator from '../../img/corewarx12.gif'
import Imp from '../../img/imp.png'
import ImpSimulator from '../../img/impx1.gif'

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: ${space.xl} 1fr 1fr 1fr 1fr 1fr ${space.xl};
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

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Intro = styled.section`
  grid-row-start: ${props => props.row};
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
  -moz-box-shadow:    inset 0 0 50px #000000;
  -webkit-box-shadow: inset 0 0 50px #000000;
  box-shadow:         inset 0 0 50px #000000;
`

class Landing extends React.Component{

  render() {
    const { history } = this.props
    return <PageWrapper>
      <LandingWrapper>
        <h1>corewar<span>.io</span></h1>
        <Octicon name="chevron-down" />
        <ButtonWrapper>
          <SuperButton onClick={() => history.push('/app/src')}>play</SuperButton>
          <SuperButton onClick={() => scrollToComponent(this.Learn)}>learn</SuperButton>
        </ButtonWrapper>
      </LandingWrapper>
      <Intro row={3} innerRef={(intro) => { this.Learn = intro }}>
        <CenterHeader>What is Corewar?</CenterHeader>
        <PrimaryIntro>
          Corewar is a coding game where you write and battle warriors against each other until one is
          declared the victor
          <br/>
          <br/>
          You play by writing programs and battle them against other users to become king of the hill.
          <br/>
          <br/>
          Build your arsenal of programs and learn to code whilst completing unique challenges and competing
          against your friends or other members of the community.
        </PrimaryIntro>
        <PrimaryImage src={Simulator} />
      </Intro>

      <Intro row={4}>
        <CenterHeader>Write your code</CenterHeader>
        <PrimaryImage width={315} src={Imp} />
        <PrimaryIntro>
          Write your warrior with a simple by expansive set of commands.
          <br/>
          <br/>
          This warrior is as simple as it comes.
          <br/>
          <br/>
          It simplies copies itself to the next address in the core over and over.
        </PrimaryIntro>
      </Intro>

      <Intro row={5}>
        <CenterHeader>See it run</CenterHeader>
        <PrimaryImage src={ImpSimulator} />
        <PrimaryIntro>
          Load your code into our simulator and see it run live before you eyes
          <br/>
          <br/>
          Each cycle the imp copies itself into the next square and repeats until the round ends.
        </PrimaryIntro>
      </Intro>

      <Intro row={6}>
        <CenterHeader>Battle!</CenterHeader>
        <PrimaryIntro>
          Load multiple warriors into the simulator to test your skills
          <br/>
          <br/>
          Then submit your program into one of our community hills to test yourself against
          other players to see how well it fares in the wild.
        </PrimaryIntro>
        <PrimaryImage src={Simulator} />
      </Intro>
    </PageWrapper>
  }
}

export default Landing