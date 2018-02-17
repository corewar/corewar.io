import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from './sourceCodeTextArea'
import CompiledOutput from './compiledOutput'
import MessagePanel from './messagePanel'
import MobilePage from '../common/mobilePage'
import ControlsContainer from '../parser/controlsContainer'
import FileManagerContainer from '../file-manager/fileManagerContainer'

import { space } from '../common/theme'

import {
  parse,
  hideMessages
} from './actions'

const ParserGrid = styled.section`
  display: flex;
  height: calc(100vh - ${space.header} - ${space.controls});
`

const ParserInterface = ({ redcode, parse, currentWarrior, addWarrior, hideMessages, displayMessages }) => (
  <MobilePage tablet>
    <ParserGrid>
      <SourceCodeTextArea
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput tablet>
        {currentWarrior.output}
      </CompiledOutput>
    </ParserGrid>
    <ControlsContainer />
    <FileManagerContainer />
    <MessagePanel
      messages={currentWarrior.messages}
      hideMessages={hideMessages}
      show={displayMessages} />
  </MobilePage>
)


const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentWarrior: state.parser.currentWarrior,
  displayMessages: state.parser.displayMessages
})

export default connect(
  mapStateToProps,
  {
    parse,
    hideMessages
  }
)(ParserInterface)

export { ParserInterface as PureParserInterface }