import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MessagePanel from './messagePanel'
import ParserInput from './parserInput'
import ParserOutput from './parserOutput'
import WarriorList from './warriorList'

import './parseContainer.css'

import {
  parse,
  removeWarrior
} from '../../modules/parser'

const ParseContainer = ({ redcode, currentParseResult, parseResults, isParsing, parse, removeWarrior }) => (
  <div id="parseContainer">
    <ParserInput redcode={redcode} handleChange={parse} />
    <ParserOutput parseResult={currentParseResult} isParsing={isParsing} />
    <MessagePanel {...currentParseResult} />
    <WarriorList parseResults={parseResults} removeWarrior={removeWarrior} />
  </div>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult,
  parseResults: state.parser.parseResults,
  isParsing: state.parser.isParsing,
  redcode: state.parser.redcode
})

const mapDispatchToProps = dispatch => bindActionCreators({
  parse,
  removeWarrior
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseContainer)

export { ParseContainer as PureParseContainer }