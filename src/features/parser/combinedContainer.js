import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from './sourceCodeTextArea'
import CompiledOutput from './compiledOutput'
import Console from './console'
import MobilePage from '../common/mobilePage'
import ControlsContainer from '../parser/controlsContainer'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import WarriorManagerContainer from '../warriorManager/warriorManagerContainer'

import { space } from '../common/theme'

import {
  parse,
  hideConsole
} from './actions'

const ParserGrid = styled.section`
  display: flex;
  height: calc(100vh - ${space.header} - ${space.controls});
`

const ParserInterface = ({ parse, currentWarrior, hideConsole, displayConsole }) => (
  <MobilePage tablet>
    <WarriorManagerContainer />
    <ParserGrid>
      <SourceCodeTextArea
        currentWarrior={currentWarrior}
        handleChange={e => currentWarrior && parse(e.target.value)} />
      <CompiledOutput tablet>
        {currentWarrior && currentWarrior.compiled}
      </CompiledOutput>
    </ParserGrid>
    <ControlsContainer />
    <FileManagerContainer />
    <Console
      messages={currentWarrior && currentWarrior.messages}
      hideConsole={hideConsole}
      show={displayConsole} />
  </MobilePage>
)


const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentWarrior: state.parser.currentWarrior,
  displayConsole: state.parser.displayConsole
})

export default connect(
  mapStateToProps,
  {
    parse,
    hideConsole
  }
)(ParserInterface)

export { ParserInterface as PureParserInterface }