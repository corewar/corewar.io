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
  addWarrior,
  loadWarrior,
  hideMessages,
  showMessages
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

const ButtonText = styled.span`
  display: inline-block;
  font-size: 0.5em;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`

const AppContainer = ({ redcode, parse, currentParseResult,
  coreSize, getCoreInstructions, isRunning, isInitialised, addWarrior, loadWarrior,
  run, pause, step, init, hideMessages, showMessages, displayMessages }) => (
  <DesktopContainer>
    <Controls>
      <Button
        enabled={true}
        handleClick={loadWarrior}>
        <ButtonGrid>
          <Octicon name="file-directory"/>
          <ButtonText>manage files</ButtonText>
        </ButtonGrid>
      </Button>
      <ParseStatusButton
        enabled={true}
        messages={currentParseResult.messages}
        handleClick={showMessages}>
        <ButtonGrid>
          <Octicon name="terminal"/>
          <ButtonText>console</ButtonText>
        </ButtonGrid>
      </ParseStatusButton>
      <Button
        enabled={hasNoErrors(currentParseResult)}
        handleClick={addWarrior}>
        <ButtonGrid>
          <Octicon name="git-commit"/>
          <ButtonText>add to core</ButtonText>
        </ButtonGrid>
      </Button>
    </Controls>
    <ParserGrid>
      <SourceCodeTextArea desktop
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput desktop>
        {currentParseResult.warrior}
      </CompiledOutput>
      <MessagePanel
        messages={currentParseResult.messages}
        hideMessages={hideMessages}
        show={displayMessages}
        />
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
  isInitialised: state.simulator.isInitialised,
  displayMessages: state.parser.displayMessages
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
    loadWarrior,
    getCoreInstructions,
    hideMessages,
    showMessages
  }
)(AppContainer)

export { AppContainer as PureAppContainer }