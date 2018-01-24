import React from 'react'
import { connect } from 'react-redux'

import CompiledOutput from '../styledComponents/compiledOutput'

const OutputInterface = ({ currentParseResult }) => (
  <CompiledOutput>
    {currentParseResult.warrior}
  </CompiledOutput>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureOutputInterface }