import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SourceCodeTextArea from './sourceCodeTextArea'
import MessagePanel from './messagePanel'
import ControlsContainer from '../parser/controlsContainer'

import {
  parse
} from './actions'

const InputContainer = ({ redcode, parse, currentParseResult }) => (
  <MobilePage mobile>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <ControlsContainer />
    <MessagePanel messages={currentParseResult && currentParseResult.messages} />
  </MobilePage>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(InputContainer)

export { InputContainer as PureInputContainer }