import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import CompiledOutput from './compiledOutput'
import ControlsContainer from './controlsContainer'
import FileManagerContainer from '../file-manager/fileManagerContainer'

const OutputInterface = ({ currentParseResult }) => (
  <MobilePage mobile>
    <CompiledOutput mobile>
      {currentParseResult.warrior}
    </CompiledOutput>
    <FileManagerContainer />
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