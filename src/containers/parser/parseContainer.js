import React from 'react'
import { connect } from 'react-redux'

import MessagePanel from './messagePanel'
import ParserInput from './parserInput'
import ParserOutput from './parserOutput'
import InputSectionHeader from './inputSectionHeader'
import OutputSectionHeader from './outputSectionHeader'
import ParseControls from './parseControls'

import './parseContainer.css'

import {
  parse
} from '../../actions/parserActions'

const ParseContainer = ({ redcode, currentParseResult, parseResults, isParsing, parse }) => (
  <div id="parseContainer">
    <ParseControls />
    <InputSectionHeader headerText={`instructions`} />
    <ParserInput redcode={redcode} handleChange={parse} />
    <OutputSectionHeader headerText={`runtime`} />
    <ParserOutput parseResult={currentParseResult} isParsing={isParsing} />
    <MessagePanel {...currentParseResult} />
  </div>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult,
  parseResults: state.parser.parseResults,
  isParsing: state.parser.isParsing,
  redcode: state.parser.redcode
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(ParseContainer)

export { ParseContainer as PureParseContainer }