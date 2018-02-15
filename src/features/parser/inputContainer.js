import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SourceCodeTextArea from './sourceCodeTextArea'
import MessagePanel from './messagePanel'
import FileManagerContainer from '../file-manager/fileManagerContainer'
import ControlsContainer from '../parser/controlsContainer'

import {
  parse,
  hideMessages
} from './actions'

const InputContainer = ({ redcode, parse, currentParseResult, hideMessages, displayMessages }) => (
  <MobilePage mobile>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <ControlsContainer />
    <FileManagerContainer />
    <MessagePanel
      hideMessages={hideMessages}
      messages={currentParseResult && currentParseResult.messages}
      show={displayMessages} />
  </MobilePage>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult,
  displayMessages: state.parser.displayMessages
})

export default connect(
  mapStateToProps,
  {
    parse,
    hideMessages
  }
)(InputContainer)

export { InputContainer as PureInputContainer }