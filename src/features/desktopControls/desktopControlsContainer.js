import React from 'react'
import { connect } from 'react-redux'

import { setInterfaceMode } from '../interfaceModeSelector/actions'
import { addWarrior, toggleFileManager } from '../parser/actions'

import { toggleSettings } from '../simulator/actions'

import OcticonButton from '../common/octiconButton'
import WarriorManagerContainer from '../warriorManager/warriorManagerContainer'
import Controls from '../common/headerControls'
import INTERFACE_MODE from '../interfaceModeSelector/interfaceMode'

const DesktopControlsContainer = ({
  setInterfaceMode,
  interfaceMode,
  addWarrior,
  toggleFileManager,
  toggleSettings
}) => (
  <Controls>
    <OcticonButton
      active={interfaceMode === INTERFACE_MODE.EDITOR}
      handleClick={() => setInterfaceMode(INTERFACE_MODE.EDITOR)}
      iconName={`pencil`}
      buttonText={`Editor`}
    />
    <OcticonButton
      active={interfaceMode === INTERFACE_MODE.PLAYER}
      handleClick={() => setInterfaceMode(INTERFACE_MODE.PLAYER)}
      iconName={`eye`}
      buttonText={`Player`}
    />
    <OcticonButton
      handleClick={toggleFileManager}
      iconName={`file-directory`}
      buttonText={`Files`}
    />
    <OcticonButton handleClick={addWarrior} iconName={`plus`} buttonText={`New file`} />
    <WarriorManagerContainer />
    <OcticonButton handleClick={toggleSettings} iconName={`gear`} buttonText={`Settings`} />
  </Controls>
)

const mapStateToProps = state => ({
  interfaceMode: state.interfaceMode.interfaceMode
})

export default connect(mapStateToProps, {
  setInterfaceMode,
  addWarrior,
  toggleFileManager,
  toggleSettings
})(DesktopControlsContainer)

export { DesktopControlsContainer as PureDesktopControlsContainer }
