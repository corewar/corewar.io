import { takeEvery, call, put } from 'redux-saga/effects'
import { ajax } from 'jquery'

import { SUBSCRIBE_REQUESTED, SUBSCRIPTION_RESPONSE } from './actions'

function makeSubscriptionRequest(email) {
  const u = '9d2b90bafd78376eae99a681a'
  const id = '1feb77c16a'

  return ajax({
    url: `https://corewar.us17.list-manage.com/subscribe/post-json?u=${u}&id=${id}&EMAIL=${email}&c=?`,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8'
  }).done(res => res)
}

export function* subscribeSaga({ email }) {
  try {
    const response = yield call(makeSubscriptionRequest, email)
    yield put({ type: SUBSCRIPTION_RESPONSE, message: response.msg })
  } catch (error) {
    let msg = error.msg
    if (msg.includes('is already subscribed to list')) {
      msg = 'Thanks for the enthusiasm but it looks like you are already signed up to our list'
    }
    yield put({ type: SUBSCRIPTION_RESPONSE, message: msg })
  }
}

export const signupWatchers = [takeEvery(SUBSCRIBE_REQUESTED, subscribeSaga)]
