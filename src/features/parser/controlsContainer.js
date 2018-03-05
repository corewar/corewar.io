import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import OcticonButton from  '../common/octiconButton'
import Controls from  '../common/controls'

import {
  addWarrior,
  toggleConsole,
  toggleFileManager
} from './actions'

const MobileControls = ({ addWarrior, currentWarrior, toggleConsole, toggleFileManager }) => (
  <Controls>
    <OcticonButton
      enabled={hasNoErrors(currentWarrior)}
      handleClick={addWarrior}
      iconName={`plus`}
      buttonText={`add`} />
    <OcticonButton
      handleClick={toggleFileManager}
      iconName={`file-directory`}
      buttonText={`files`} />
    <OcticonButton
      enabled={true}
      handleClick={toggleConsole}
      iconName={`terminal`}
      buttonText={`console`} />
  </Controls>
)

const hasNoErrors = (currentWarrior) => (
  currentWarrior.compiled && currentWarrior.messages.filter(x => x.type === 0).length === 0
)

MobileControls.PropTypes = {
  addWarrior: PropTypes.func,
  loadWarrior: PropTypes.func,
  currentWarrior: PropTypes.shape({
    compiled: PropTypes.string,
    messages: PropTypes.array
  }).isRequired
}

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior
})

export default connect(
  mapStateToProps,
  {
    addWarrior,
    toggleConsole,
    toggleFileManager
  }
)(MobileControls)

export { MobileControls as PureMobileControls }