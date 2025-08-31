import { FEEDBACK_RESPONSE } from './actions'

// state
import initialState from './initialState'

// selectors
export const getFeedbackState = (state) => state.feedback

// reducer
const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_RESPONSE:
      return {
        ...state,
        feedbackMessage: action.message.message
      }

    default:
      return state
  }
}

export default feedbackReducer
