import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'

import {
  moveImp
} from './actions'

const TutorialGrid = styled.main`
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: ${space.header} auto auto;
  grid-template-columns: 100%;
  color: ${colour.white};
`

const Lede = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${space.xl};
  margin-bottom: ${space.xl};
  padding-top: ${space.l};

  h2 {
    font-size: ${font.large};
    width: 50%;
    ${media.tablet`width: 80%;`}
    text-align: center;
    color: ${colour.blue};
    font-family: ${font.code};
  }
`

const Content = styled.section`
  background-color: ${colour.lightbg};
  font-size: ${font.large};
  line-height: ${font.xlarge};
  padding: ${space.xl} 0 0 10%;
  font-weight: 300;

  p {
    width: 60%;
    margin-bottom: ${space.xl};
  }

  h3 {
    color: ${colour.blue};
    font-size: ${font.xlarge};
    margin-bottom: ${font.large};
  }

  button {
    border: 2px solid ${colour.white};
    min-width: 100px;
    color: ${colour.white};
    border-radius: 2px;
    background-color: transparent;
    padding: ${space.m};
    margin: ${space.m} 0;

    :hover {
      cursor: pointer;
      background-color: ${colour.darkbg};
    }
  }
`

const ImpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 250px;
  height: 250px;
`

const ImpCell = styled.div`
  ${props => props.visited && `background-color: ${colour.blue};`};
  ${props => props.active && `
    position: relative;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid ${colour.lightgrey};
    background-color: transparent;

    ::before,
    ::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 4px; /* cross thickness */
      background-color: ${colour.blue};
    }

    ::before {
      transform: rotate(45deg);
    }

    ::after {
      transform: rotate(-45deg);
    }
  `};
  border: 1px solid ${colour.lightgrey};
`

const TutorialContainer = ({ moveImp, impCells, impIndex }) => (
  <TutorialGrid>
    <SiteNav />
    <HeroLogo />
    <Lede>
      <h2>Learn how to write a simple corewar program and how it runs in this simple tutorial - 5 mins</h2>
    </Lede>
    <Content>
      <h3>Write an Imp</h3>
      <p>
        Corewar is a coding game where you write programs known as 'warriors' and battle them against warriors
        written by other people. This tutorial shows you how to write a program known as an 'Imp'.
      </p>
      <p>
        Below is a tiny 5x5 core, real cores are normally much larger but this will be easy to follow.
        Each address in the core can contain one instruction and the colour of the instruction indicates the
        warrior which last wrote and instruction to the address. Our warrior is blue.
      </p>
      <p>
        Let's see the Imp in action. Click the 'Step' button once to perform a 'cycle'. A cycle is like a turn in chess,
        during a cycle each warrior in the core executes their next instruction.
      </p>

      <ImpGrid>
        {impCells.map((cell, i) => (
          <ImpCell key={`cell_${i}`} visited={cell} active={impIndex === i} />
        ))}
      </ImpGrid>
      <button onClick={() => moveImp()}>Step</button>
      <p>
        Each time a cycle is completed you can see the blue X move to the next address in the core, the X represents
        that the warrior wrote an instruction to the core.
        (Also if you got excited and clicked 'step' many times you will have noticed that the addresses wrap around.)
      </p>
      <p>
        You will also see a blue square appear where the Imp last was. This represents the fact that the blue Imp
        was the last warrior to execute an instruction at that address.
      </p>
      <p>
        So we can see the imp writing and executing instructions, but what exactly are the instructions?
        Fortunately our Imp is a very simple program and consists of just a single instruction.
      </p>
      <h3>MOV 0, 1</h3>
      <p>
        The instruction above, each time its executed will MOV (MOVE) the instruction at position 0 (the current address)
        to position 1 (the next address)
      </p>
      <p>
        This results in a program which constantly copies itself to the next available address and fills up the core.
        You can demonstrate this by repeatedly clicking 'Step'.
      </p>
    </Content>
  </TutorialGrid>
)

const mapStateToProps = state => ({
  impCells: state.tutorial.impCells,
  impIndex: state.tutorial.impIndex
})

export default connect(
  mapStateToProps,
  {
    moveImp
  }
)(TutorialContainer)

export { TutorialContainer as PureTutorialContainer }