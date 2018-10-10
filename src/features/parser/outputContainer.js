import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import CompiledOutput from './compiledOutput'
import ControlsContainer from './controlsContainer'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import WarriorManagerContainer from '../warriorManager/warriorManagerContainer'

const OutputInterface = ({ currentWarrior }) => (
  <MobilePage mobile>
    <WarriorManagerContainer />
    <CompiledOutput mobile>
      {currentWarrior && currentWarrior.compiled}
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