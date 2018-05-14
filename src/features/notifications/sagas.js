import { delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { guid } from '../../helpers/guid'

import {
  ADD_NOTIFICATION,
  HIDE_NOTIFICATION
} from './actions'

import { getNotificationState } from './reducer'


export function* toast(content) {

  const id = guid()

  const notification = { id, show: true, content }

  yield put({ type: ADD_NOTIFICATION, notification})

  yield call(delay, 1000)

  const { notifications } = yield select(getNotificationState)

  const addedNotification = notifications.find(x => x.id === id)

  addedNotification.show = false

  yield put({ type: HIDE_NOTIFICATION, notification: addedNotification })
}