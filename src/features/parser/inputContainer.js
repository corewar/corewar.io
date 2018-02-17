import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SourceCodeTextArea from './sourceCodeTextArea'
import MessagePanel from './messagePanel'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import ControlsContainer from '../parser/controlsContainer'

import {
  parse,
  hideMessages
} from './actions'

const InputContainer = ({ parse, currentWarrior, hideMessages, displayMessages }) => (
  <MobilePage mobile>
    <SourceCodeTextArea
      value={currentWarrior.source}
      handleChange={e => parse(e.target.value)} />
    <ControlsContainer />
    <FileManagerContainer />
    <MessagePanel
      hideMessages={hideMessages}
      messages={currentWarrior && currentWarrior.messages}
      show={displayMessages} />
  </MobilePage>
)

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior,
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