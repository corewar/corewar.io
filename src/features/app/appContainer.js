import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from '../parser/sourceCodeTextArea'
import CompiledOutput from '../parser/compiledOutput'
import SimulatorContainer from '../simulator/simulatorContainer'
import Instructions from '../simulator/instructions'
import Console from '../parser/console'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import DesktopControlsContainer from '../desktopControls/desktopControlsContainer'

import { space } from '../common/theme'

import { parse, hideConsole } from '../parser/actions'

import { step, init, run, pause, getCoreInstructions } from '../simulator/actions'

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

const AppContainer = ({
  parse,
  currentWarrior,
  coreSize,
  getCoreInstructions,
  isRunning,
  isInitialised,
  run,
  pause,
  step,
  init,
  hideConsole,
  displayConsole
}) => (
  <DesktopContainer>
    <DesktopControlsContainer />
    <ParserGrid>
      <SourceCodeTextArea
        desktop
        currentWarrior={currentWarrior}
        handleChange={e => parse(e.target.value)}
      />
      <CompiledOutput desktop>{currentWarrior && currentWarrior.compiled}</CompiledOutput>
      <Console
        messages={currentWarrior && currentWarrior.messages}
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
    getCoreInstructions,
    hideConsole
  }
)(AppContainer)

export { AppContainer as PureAppContainer }
