import React from 'react'
import { connect } from 'react-redux'

import { setInterfaceMode } from '../interfaceModeSelector/actions'

import OcticonButton from '../common/octiconButton'
import Controls from '../common/controls'
import INTERFACE_MODE from './interfaceMode'

const InterfaceModeContainer = ({ setInterfaceMode, interfaceMode }) => (
  <Controls>
    <OcticonButton
      active={interfaceMode === INTERFACE_MODE.EDITOR}
      handleClick={() => setInterfaceMode(INTERFACE_MODE.EDITOR)}
      iconName={`pencil`}
      buttonText={`editor`}
    />
    <OcticonButton
      active={interfaceMode === INTERFACE_MODE.PLAYER}
      handleClick={() => setInterfaceMode(INTERFACE_MODE.PLAYER)}
      iconName={`eye`}
      buttonText={`player`}
    />
  </Controls>
)

const mapStateToProps = state => ({
  interfaceMode: state.interfaceMode.interfaceMode
})

export default connect(
  mapStateToProps,
  {
    setInterfaceMode
  }
)(InterfaceModeContainer)

export { InterfaceModeContainer as PureInterfaceModeContainer }
