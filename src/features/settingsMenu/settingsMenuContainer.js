import React from 'react'
import { connect } from 'react-redux'

import { setCoreOptions } from '../simulator/actions'

import SettingsMenu from './settingsMenu'

const SettingsMenuContainer = ({ displaySettings, coreOptions, setCoreOptions, currentCoreOption }) => (
  <SettingsMenu
    show={displaySettings}
    options={coreOptions}
    handleClick={setCoreOptions}
    currentSelection={currentCoreOption}
    />
)

const mapStateToProps = state => ({
  displaySettings: state.simulator.displaySettings,
  coreOptions: state.simulator.coreOptions,
  currentCoreOption: state.simulator.currentCoreOption
})

export default connect(
  mapStateToProps,
  {
    setCoreOptions
  }
)(SettingsMenuContainer)

export { SettingsMenuContainer as PureSettingsMenuContainer }