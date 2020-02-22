import { SET_INTERFACE_MODE } from './actions'

// state
import initialState from './initialState'

// selectors
export const getInterfaceState = state => state.interface

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERFACE_MODE:
      return {
        ...state,
        interfaceMode: action.mode
      }

    default:
      return state
  }
}
