import React from 'react'
import { connect } from 'react-redux'

import CompiledOutput from '../styledComponents/compiledOutput'
import MobileControls from '../../containers/parser/mobileControls'

const OutputInterface = ({ currentParseResult }) => (
  <CompiledOutput mobile>
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