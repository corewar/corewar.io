import {
  SUBSCRIPTION_RESPONSE
} from './actions'

// state
import initialState from './initialState'

// selectors
export const getSignupState = state => state.signup

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SUBSCRIPTION_RESPONSE:
      return {
        ...state,
        signupMessage: action.message
      }

    default:
      return state
  }
}

