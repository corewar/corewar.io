import { takeEvery, call, put } from 'redux-saga/effects'

import {
  FEEDBACK_REQUESTED,
  FEEDBACK_RESPONSE
} from './actions'

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

const sendFeedback = payload => {

  return fetch('/api/email', {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: payload
  })
  .then(handleErrors)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export function* feedbackSaga(payload) {

  const { email, msg } = payload

  const feedback = {
    email,
    feedback: msg
  }

  const response = yield call(sendFeedback, JSON.stringify(feedback))

  yield put({ type: FEEDBACK_RESPONSE, message: response })
}

export const feedbackWatchers = [
  takeEvery(FEEDBACK_REQUESTED, feedbackSaga)
]