import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MessagePanel from './messagePanel'
import ParserInput from './parserInput'
import ParserOutput from './parserOutput'

import './parseContainer.css'

import {
  parse
} from '../../modules/parser'

const ParseContainer = ({ redcode, currentParseResult, isParsing, parse }) => {

  return <div id="parseContainer">
    <ParserInput redcode={redcode} handleChange={parse} />
    <ParserOutput parseResult={currentParseResult} isParsing={isParsing} />
    <MessagePanel {...currentParseResult} />
  </div>
}

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult,
  isParsing: state.parser.isParsing,
  redcode: state.parser.redcode
})

const mapDispatchToProps = dispatch => bindActionCreators({
  parse
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseContainer)

export { ParseContainer as PureParseContainer }