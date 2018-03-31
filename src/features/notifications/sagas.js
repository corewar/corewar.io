import { delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { guid } from '../../helpers/guid'

import { insertItem, removeItemByKey } from '../../helpers/arrayHelpers'

import {
  ADD_NOTIFICATION,
  HIDE_NOTIFICATION
} from './actions'

import { getNotificationState } from './reducer'


export function* toast(content) {

  const id = guid()

  const notification = { id, show: true, content: content }

  yield put({ type: ADD_NOTIFICATION, notification})

  yield call(delay, 1000)

  const notificationState = yield select(getNotificationState)

  const addedNotification = notificationState.notifications.find(x => x.id === id)

  addedNotification.show = false

  yield put({ type: HIDE_NOTIFICATION, notification: addedNotification })
}