import {
  FEEDBACK_RESPONSE
} from './actions'

// state
const initialState = {
  feedbackMessage: ''
}

// selectors
export const getFeedbackState = state => state.feedback

// reducer
export default (state = initialState, action) => {
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

