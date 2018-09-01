import {
  ADD_NOTIFICATION,
  HIDE_NOTIFICATION
} from './actions'

import { insertItem, replaceItemByKey } from '../../helpers/arrayHelpers'

// state
import initialState from './initialState'

// selectors
export const getNotificationState = state => state.notification

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: insertItem(state.notifications.length, state.notifications, action.notification)
      }

    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: replaceItemByKey('id', action.notification.id, state.notifications, action.notification)
      }

    default:
      return state
  }
}

