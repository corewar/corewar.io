import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from '../parser/sourceCodeTextArea'
import CompiledOutput from '../parser/compiledOutput'
import Controls from '../common/headerControls'
import SimulatorContainer from '../simulator/simulatorContainer'
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

const AppContainer = ({ parse, currentWarrior,
  coreSize, getCoreInstructions, isRunning, isInitialised, addWarrior, toggleFileManager,
  toggleSettings, run, pause, step, init, toggleConsole, hideConsole, displayConsole }) => (
  <DesktopContainer>
    <Controls>
      <OcticonButton
        handleClick={toggleFileManager}
        iconName={`file-directory`}
        buttonText={`files`} />
      <OcticonButton
        handleClick={toggleConsole}
        iconName={`terminal`}
        buttonText={`console`}
        />
      <OcticonButton
        handleClick={toggleSettings}
        iconName={`gear`}
        buttonText={`settings`} />
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