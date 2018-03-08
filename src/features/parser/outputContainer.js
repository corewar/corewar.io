import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import CompiledOutput from './compiledOutput'
import ControlsContainer from './controlsContainer'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import WarriorPanel from '../common/warriorPanel'

const OutputInterface = ({ currentWarrior }) => (
  <MobilePage mobile>
    <WarriorPanel />
    <CompiledOutput mobile>
      {currentWarrior.compiled}
    </CompiledOutput>
    <FileManagerContainer />
    <ControlsContainer />
  </MobilePage>
)

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureOutputInterface }