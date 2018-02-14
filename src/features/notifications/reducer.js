import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './actions'

import { insertItem, removeItem } from '../../helpers/arrayHelpers'

// state
const initialState = {
  notifications: []
}

// selectors
export const getNotificationState = state => state.notification

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: insertItem(state.notifications.length - 1, state.notifications, action.content)
      }

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: removeItem(0, state.notifications)
      }

    default:
      return state
  }
}

