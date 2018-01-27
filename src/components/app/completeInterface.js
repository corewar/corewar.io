import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import CompiledOutput from '../styledComponents/compiledOutput'
import Controls from '../styledComponents/desktop/controls'
import CoreContainer from '../../containers/simulator/coreContainer'
import Button from '../styledComponents/button'

import { space } from '../../styles/theme'

import {
  parse,
  addWarrior
} from '../../actions/parserActions'

import {
  step,
  init,
  run,
  pause,
  getCoreInstructions
} from '../../actions/simulatorActions'

const DesktopContainer = styled.section`
  display: grid;
  grid-template-columns: 5fr 1fr 4fr;
  grid-template-rows: ${space.header} 1fr;
  grid-column-gap: ${space.m};
`

const ParserGrid = styled.section`
  grid-row-start: 2;
  display: flex;
  height: calc(100vh - ${space.header} - ${space.header});
`

const CompleteInterface = ({ redcode, parse, currentParseResult,
  coreSize, getCoreInstructions, isRunning, isInitialised, addWarrior,
  run, pause, step, init }) => (
  <DesktopContainer>
    <Controls>
      <Button onClick={addWarrior}>
        <Octicon mega name="chevron-right"/>
      </Button>
    </Controls>
    <ParserGrid>
      <SourceCodeTextArea desktop
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput desktop>
        {currentParseResult.warrior}
      </CompiledOutput>
    </ParserGrid>
    <div></div>
    <CoreContainer
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      run={run}
      pause={pause}
      step={step}
      init={init}
      />
  </DesktopContainer>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult,
  coreSize: state.simulator.coreSize,
  getCoreInstructions: state.simulator.getCoreInstructions,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised
})

export default connect(
  mapStateToProps,
  {
    run,
    init,
    pause,
    parse,
    step,
    addWarrior,
    getCoreInstructions
  }
)(CompleteInterface)

export { CompleteInterface as PureCompleteInterface }