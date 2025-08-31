import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setInterfaceMode } from '../interfaceModeSelector/actions'

import Controls from '../common/controls'
import OcticonButton from '../common/octiconButton'
import INTERFACE_MODE from './interfaceMode'

const InterfaceModeButtons = ({ setInterfaceMode, interfaceMode }) => {
  const navigate = useNavigate()

  const clickHandler = (e, setInterfaceMode, interfaceMode) => {
    setInterfaceMode(interfaceMode)

    switch (interfaceMode) {
      case INTERFACE_MODE.EDITOR:
        navigate('/app/editor/src')
        break
      case INTERFACE_MODE.PLAYER:
        navigate('/app/player/config')
        break
      default:
        break
    }
  }

  return (
    <Controls>
      <OcticonButton
        active={interfaceMode === INTERFACE_MODE.EDITOR}
        handleClick={(e) => clickHandler(e, setInterfaceMode, INTERFACE_MODE.EDITOR)}
        iconName={`pencil`}
        buttonText={`Editor`}
      />
      <OcticonButton
        active={interfaceMode === INTERFACE_MODE.PLAYER}
        handleClick={(e) => clickHandler(e, setInterfaceMode, INTERFACE_MODE.PLAYER)}
        iconName={`eye`}
        buttonText={`Player`}
      />
    </Controls>
  )
}

const InterfaceModeContainer = ({ setInterfaceMode, interfaceMode }) => (
  <InterfaceModeButtons setInterfaceMode={setInterfaceMode} interfaceMode={interfaceMode} />
)

const mapStateToProps = (state) => ({
  interfaceMode: state.interfaceMode.interfaceMode
})

export default connect(mapStateToProps, {
  setInterfaceMode
})(InterfaceModeContainer)

export { InterfaceModeContainer as PureInterfaceModeContainer }
