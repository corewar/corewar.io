import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SourceCodeTextArea from './sourceCodeTextArea'
import MessagePanel from './messagePanel'
import ControlsContainer from '../parser/controlsContainer'
import Notification from '../notifications/notification'

import {
  parse,
  hideMessages
} from './actions'

const InputContainer = ({ redcode, parse, currentParseResult, hideMessages, displayMessages, notifications }) => (
  <MobilePage mobile>
    <Notification notifications={notifications}/>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <ControlsContainer />
    <MessagePanel
      hideMessages={hideMessages}
      messages={currentParseResult && currentParseResult.messages}
      show={displayMessages} />
  </MobilePage>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult,
  displayMessages: state.parser.displayMessages,
  notifications: state.parser.notifications
})

export default connect(
  mapStateToProps,
  {
    parse,
    hideMessages
  }
)(InputContainer)

export { InputContainer as PureInputContainer }