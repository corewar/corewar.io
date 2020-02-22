import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colour } from '../common/theme'

import DocumentationContent from './documentationContent'

import { moveImp } from './actions'

const ImpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 250px;
  height: 250px;
`

const ImpCell = styled.div`
  ${props => props.visited && `background-color: ${colour.blue};`};
  ${props =>
    props.active &&
    `
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

export const ImpTutorialContainer = ({ moveImp, impCells, impIndex }) => (
  <DocumentationContent>
    <h3>2. Write an Imp</h3>
    <p>
      Corewar is a coding game where you write programs known as 'warriors' and battle them against
      warriors written by other people. This tutorial shows you how to write a program known as an
      'Imp'.
    </p>
    <p>
      Below is a tiny 5x5 core, real cores are normally much larger but this will be easy to follow.
      Each address in the core can contain one instruction and the colour of the instruction
      indicates the warrior which last wrote and instruction to the address. Our warrior is blue.
    </p>
    <p>
      Let's see the Imp in action. Click the 'Step' button once to perform a 'cycle'. A cycle is
      like a turn in chess, during a cycle each warrior in the core executes their next instruction.
    </p>

    <ImpGrid>
      {impCells.map((cell, i) => (
        <ImpCell key={`cell_${i}`} visited={cell} active={impIndex === i} />
      ))}
    </ImpGrid>
    <button onClick={() => moveImp()}>Step</button>
    <p>
      Each time a cycle is completed you can see the blue X move to the next address in the core,
      the X represents that the warrior wrote an instruction to the core. (Also if you got excited
      and clicked 'step' many times you will have noticed that the addresses wrap around.)
    </p>
    <p>
      You will also see a blue square appear where the Imp last was. This represents the fact that
      the blue Imp was the last warrior to execute an instruction at that address.
    </p>
    <p>
      So we can see the imp writing and executing instructions, but what exactly are the
      instructions? Fortunately our Imp is a very simple program and consists of just a single
      instruction.
    </p>
    <pre>MOV 0, 1</pre>
    <p>
      The instruction above, each time its executed will MOV (MOVE) the instruction at position 0
      (the current address) to position 1 (the next address)
    </p>
    <p>
      This results in a program which constantly copies itself to the next available address and
      fills up the core. You can demonstrate this by repeatedly clicking 'Step'.
    </p>
  </DocumentationContent>
)

const mapStateToProps = state => ({
  impCells: state.documentation.impCells,
  impIndex: state.documentation.impIndex
})

export default connect(mapStateToProps, {
  moveImp
})(ImpTutorialContainer)

export { ImpTutorialContainer as PureImpTutorialContainer }
