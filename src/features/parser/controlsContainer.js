import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import OcticonButton from '../common/octiconButton'
import Controls from '../common/controls'

import { addWarrior, toggleConsole, toggleFileManager } from './actions'

const MobileControls = ({ toggleConsole, toggleFileManager }) => (
  <Controls>
    <OcticonButton handleClick={toggleFileManager} iconName={`pencil`} buttonText={`editor`} />
    <OcticonButton handleClick={toggleConsole} iconName={`eye`} buttonText={`player`} />
  </Controls>
)

MobileControls.propTypes = {
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
    toggleConsole,
    toggleFileManager
  }
)(MobileControls)

export { MobileControls as PureMobileControls }
