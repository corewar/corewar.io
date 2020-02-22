import { action } from '../../actions/creator'

export const SET_INTERFACE_MODE = 'interface/SET_INTERFACE_MODE'

export const setInterfaceMode = mode => action(SET_INTERFACE_MODE, { mode })
