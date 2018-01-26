import React from 'react'
import { connect } from 'react-redux'

import CompiledOutput from '../styledComponents/compiledOutput'
import MobileContent from '../styledComponents/mobile/mobileContent'
import MobileControls from '../../containers/parser/mobileControls'

const OutputInterface = ({ currentParseResult }) => (
  <MobileContent>
    <CompiledOutput mobile>
      {currentParseResult.warrior}
    </CompiledOutput>
    <MobileControls />
  </MobileContent>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureOutputInterface }