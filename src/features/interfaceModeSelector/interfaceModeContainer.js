import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { setInterfaceMode } from '../interfaceModeSelector/actions'

import OcticonButton from '../common/octiconButton'
import Controls from '../common/controls'
import INTERFACE_MODE from './interfaceMode'

const clickHandler = (e, history, setInterfaceMode, interfaceMode) => {
  setInterfaceMode(interfaceMode)

  switch (interfaceMode) {
    case INTERFACE_MODE.EDITOR:
      history.push(`/app/editor/src`)
      break
    case INTERFACE_MODE.PLAYER:
      history.push(`/app/player/config`)
      break
    default:
      break
  }
}

const InterfaceModeContainer = ({ setInterfaceMode, interfaceMode }) => (
  <Controls>
    <Route
      render={({ history }) => (
        <OcticonButton
          active={interfaceMode === INTERFACE_MODE.EDITOR}
          handleClick={e => clickHandler(e, history, setInterfaceMode, INTERFACE_MODE.EDITOR)}
          iconName={`pencil`}
          buttonText={`editor`}
        />
      )}
    />
    <Route
      render={({ history }) => (
        <OcticonButton
          active={interfaceMode === INTERFACE_MODE.PLAYER}
          handleClick={e => clickHandler(e, history, setInterfaceMode, INTERFACE_MODE.PLAYER)}
          iconName={`eye`}
          buttonText={`player`}
        />
      )}
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
