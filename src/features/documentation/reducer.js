import { replaceItem } from '../../helpers/arrayHelpers'
import {
  MOVE_IMP
} from './actions'

// state
const initialState = {
  impCells: [
    0,0,0,0,0,
    0,0,0,0,0,
    0,0,0,0,0,
    0,0,0,0,0,
    0,0,0,0,0
  ],
  impIndex: 7
}

// selectors
export const getDocumentationState = state => state.documentation

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case MOVE_IMP:
      return {
        ...state,
        impCells: replaceItem(state.impIndex, state.impCells, 1),
        impIndex: (state.impIndex + 1) % 25
      }

    default:
      return state
  }
}

