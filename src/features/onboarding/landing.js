import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../common/theme'
import { media } from '../common/mediaQuery'

import Simulator from '../../img/corewarx12.gif'
import Imp from '../../img/imp.png'
import ImpSimulator from '../../img/impx1.gif'

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: ${space.xl} 1fr 1fr 1fr 1fr 1fr 100px;
  grid-row-gap: ${space.l};
  color: ${colour.white};
  font-size: ${font.large};
`

const Header = styled.header`
  grid-column: 2 / 4;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const LandingWrapper = styled.div`

  grid-row-start: 2;
  grid-column: 1 / 4;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${space.xl});
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
  transition: 0.5s;


  ${media.tablet`width: 200px;`}
  ${media.tablet`height: 50px;`}
  ${media.tablet`font-size: ${font.base};`}
  ${media.tablet`padding: ${space.s};`}

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: ${colour.defaultbg};
    border: 1px solid ${colour.grey};
    color: ${colour.grey};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Intro = styled.section`
  grid-row-start: ${props => props.row};
  grid-column: 1 / 5;
  grid-column-gap: ${space.l};
  min-height: 100vh;
  height: auto;

  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 10% 1fr 1fr 10%;
  padding-top: ${space.l};
  padding-bottom: ${space.l};

  ${props => props.row % 2 === 0 ? `background-color: ${colour.darkbg};` : `background-color: ${colour.lightbg};`}
`

const CenterHeader = styled.h2`
  grid-column: 2 / 4;
  font-size: ${font.xlarge};
  font-family: ${font.code};
  text-align: center;
`

const PrimaryIntro = styled.p`
  margin-top: ${space.xl};
  font-weight: 200;
  line-height: 1.3em;
  font-size: ${font.large};
  grid-column-start: 2;
`

const ImageWrapper = styled.div`
  border: 1px solid ${colour.white};
`

const Footer = styled.footer`
  background-color: ${colour.lightbg};
  width: 100%;
  grid-row-start: 7;
  grid-column: 1 / 5;
`

const Github = styled.div`
  color: ${colour.grey};
  padding: ${space.m};
  text-align: right;
`

class Landing extends React.Component{

  render() {
    const { history } = this.props
    return <PageWrapper>
      <Header>
        <div></div>
        <Github><a href={`https://github.com/gareththegeek/corewar`}><Octicon name="mark-github" mega /></a></Github>
      </Header>
      <LandingWrapper>
        <h1>corewar<span>.io</span></h1>
        <Octicon name="chevron-down" />
        <ButtonWrapper>
          <SuperButton onClick={() => history.push('/app/src')}>play</SuperButton>
          <SuperButton onClick={() => {}}>learn</SuperButton>
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
        <ImageWrapper />
      </Intro>

      <Intro row={4}>
        <CenterHeader>Write your code</CenterHeader>
        <ImageWrapper />
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
        <ImageWrapper />
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
        <ImageWrapper />
      </Intro>
      <Footer>
       &copy; 2018 @gareththegeek &amp; @dougajmcdonald
      </Footer>
    </PageWrapper>
  }
}

export default Landing