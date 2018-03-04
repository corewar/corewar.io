import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import SourceCodeTextArea from '../parser/sourceCodeTextArea'
import CompiledOutput from '../parser/compiledOutput'
import Controls from '../common/headerControls'
import SimulatorContainer from '../simulator/simulatorContainer'
import Button from '../common/button'
import ConsoleButton from '../parser/consoleButton'
import Instructions from '../simulator/instructions'
import Console from '../parser/console'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import OcticonButton from '../common/octiconButton'

import { space } from '../common/theme'

import {
  parse,
  addWarrior,
  toggleFileManager,
  hideConsole,
  toggleConsole
} from '../parser/actions'

import {
  step,
  init,
  run,
  pause,
  toggleSettings,
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

const AppContainer = ({ parse, currentWarrior,
  coreSize, getCoreInstructions, isRunning, isInitialised, addWarrior, toggleFileManager,
  toggleSettings, run, pause, step, init, toggleConsole, hideConsole, displayConsole }) => (
  <DesktopContainer>
    <Controls>
      <OcticonButton
        enabled={hasNoErrors(currentWarrior)}
        handleClick={addWarrior}
        iconName={`plus`}
        buttonText={`add`} />
      <Button
        enabled={true}
        handleClick={toggleFileManager}>
        <ButtonGrid>
          <Octicon name="file-directory"/>
          <ButtonText>files</ButtonText>
        </ButtonGrid>
      </Button>
      <ConsoleButton
        enabled={true}
        messages={currentWarrior.messages}
        handleClick={toggleConsole}>
        <ButtonGrid>
          <Octicon name="terminal"/>
          <ButtonText>console</ButtonText>
        </ButtonGrid>
      </ConsoleButton>
      <Button
        enabled={true}
        handleClick={toggleSettings}>
        <ButtonGrid>
          <Octicon name="gear"/>
          <ButtonText>settings</ButtonText>
        </ButtonGrid>
      </Button>
    </Controls>
    <ParserGrid>
      <SourceCodeTextArea desktop
        value={currentWarrior.source}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput desktop>
        {currentWarrior.compiled}
      </CompiledOutput>
      <Console
        messages={currentWarrior.messages}
        hideConsole={hideConsole}
        show={displayConsole}
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
      mobile={false}
      tablet={false}
      />
    <FileManagerContainer />
  </DesktopContainer>
)

const hasNoErrors = (currentWarrior) => (
  currentWarrior.compiled && currentWarrior.messages.filter(x => x.type === 0).length === 0
)

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior,
  coreSize: state.simulator.coreSize,
  getCoreInstructions: state.simulator.getCoreInstructions,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised,
  displayConsole: state.parser.displayConsole
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
    toggleFileManager,
    toggleSettings,
    getCoreInstructions,
    hideConsole,
    toggleConsole
  }
)(AppContainer)

export { AppContainer as PureAppContainer }