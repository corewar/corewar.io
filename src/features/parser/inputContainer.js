import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SourceCodeTextArea from './sourceCodeTextArea'
import Console from './console'
import FileManagerContainer from '../fileManager/fileManagerContainer'
import ControlsContainer from '../parser/controlsContainer'
import WarriorManagerContainer from '../warriorManager/warriorManagerContainer'

import {
  parse,
  hideConsole
} from './actions'

const InputContainer = ({ parse, currentWarrior, hideConsole, displayConsole }) => (
  <MobilePage mobile>
    <WarriorManagerContainer />
    <SourceCodeTextArea
      value={currentWarrior.source}
      handleChange={e => parse(e.target.value)} />
    <ControlsContainer />
    <FileManagerContainer />
    <Console
      hideConsole={hideConsole}
      messages={currentWarrior && currentWarrior.messages}
      show={displayConsole} />
  </MobilePage>
)

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior,
  displayConsole: state.parser.displayConsole
})

export default connect(
  mapStateToProps,
  {
    parse,
    hideConsole
  }
)(InputContainer)

export { InputContainer as PureInputContainer }