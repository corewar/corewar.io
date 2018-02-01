import React from 'react'
import { connect } from 'react-redux'

import SourceCodeTextArea from '../../components/styledComponents/sourceCodeTextArea'
import MessagePanel from '../../components/parser/messagePanel'

import {
  parse
} from '../../actions/parserActions'

const InputInterface = ({ redcode, parse, currentParseResult }) => (
  <div>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <MessagePanel messages={currentParseResult && currentParseResult.messages} />
  </div>
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
)(InputInterface)

export { InputInterface as PureInputInterface }