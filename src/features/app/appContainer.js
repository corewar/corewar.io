import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import SourceCodeTextArea from '../parser/sourceCodeTextArea'
import CompiledOutput from '../parser/compiledOutput'
import Controls from '../common/headerControls'
import SimulatorContainer from '../simulator/simulatorContainer'
import Button from '../common/button'
import ParseStatusButton from '../parser/parseStatusButton'
import Instructions from '../simulator/instructions'
import MessagePanel from '../parser/messagePanel'

import { space } from '../common/theme'

import {
  parse,
  addWarrior
} from '../parser/actions'

import {
  step,
  init,
  run,
  pause,
  getCoreInstructions
} from '../simulator/actions'

const DesktopContainer = styled.section`
  display: grid;
  grid-template-columns: 5fr 0.75fr 4fr 1px;
  grid-template-rows: ${space.header} 1fr;
  grid-column-gap: ${space.m};
  position: relative;
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
      <Button onClick={addWarrior} enabled={hasNoErrors(currentParseResult)}>
        <Octicon mega name="chevron-right"/>
      </Button>
      <ParseStatusButton
        enabled={hasNoErrors(currentParseResult)}
        messages={currentParseResult.messages}
        handleClick={() => { console.log('disabled clicked me') }}>
          <Octicon mega name="issue-opened"/>
      </ParseStatusButton>
    </Controls>
    <ParserGrid>
      <SourceCodeTextArea desktop
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput desktop>
        {currentParseResult.warrior}
      </CompiledOutput>
      <MessagePanel messages={currentParseResult.messages} />
    </ParserGrid>
    <Instructions />

      <SimulatorContainer
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

const hasNoErrors = (currentParseResult) => (
  currentParseResult.warrior && currentParseResult.messages.filter(x => x.type === 0).length === 0
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