import {
  SUBSCRIPTION_RESPONSE
} from './actions'

// state
const initialState = {
  signupMessage: ''
}

// selectors
export const getSignUpState = state => state.signup

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SUBSCRIPTION_RESPONSE:
      console.log('reducer', action.message)
      return {
        ...state,
        signupMessage: action.message
      }

    default:
      return state
  }
}

