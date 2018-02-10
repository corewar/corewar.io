import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import CompiledOutput from './compiledOutput'
import ControlsContainer from './controlsContainer'

const OutputInterface = ({ currentParseResult }) => (
  <MobilePage>
    <CompiledOutput mobile>
      {currentParseResult.warrior}
    </CompiledOutput>
    <ControlsContainer />
  </MobilePage>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureOutputInterface }