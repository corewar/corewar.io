import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './actions'


export function* postToast(msg) {

  yield put({ type: ADD_NOTIFICATION, msg })

  yield call(delay, 2000)

  yield put({ type: REMOVE_NOTIFICATION })
}