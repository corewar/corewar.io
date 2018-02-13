import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { insertItem, removeItem } from '../../helpers/arrayHelpers'

import { corewar } from 'corewar'

import {
  PARSE,
  PARSE_REQUESTED,
  ADD_WARRIOR,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR,
  REMOVE_WARRIOR_REQUESTED,
  SHOW_MESSAGES,
  HIDE_MESSAGES,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './actions'

import { getParserState } from './reducer'
import { pauseSaga, getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

// sagas
export function* parseSaga({ redcode }) {

  let result = yield call([corewar, corewar.parse], redcode)

  const warrior = yield call([corewar, corewar.serialise], result.tokens)

  result.warrior = warrior;

  if(result.messages.find(x => x.type === 0)){
    yield put({ type: SHOW_MESSAGES })
  } else {
    yield put({ type: HIDE_MESSAGES})
  }

  yield put({ type: PARSE, result, redcode })

}

export function* addWarriorSaga() {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const { currentParseResult } = yield select(getParserState)

  const result = yield call(insertItem, data.parseResults.length, data.parseResults, currentParseResult)

  yield put({ type: ADD_WARRIOR, result })

  yield call(postToast, 'Warrior Added')

  yield call(initialiseCore, data.options, result)

}

function* postToast(msg) {

  yield put({
    type: ADD_NOTIFICATION,
    msg
  })

  yield call(delay, 2000)

  yield put({ type: REMOVE_NOTIFICATION })
}

export function* removeWarriorSaga({ index }) {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const result = yield call(removeItem, index, data.parseResults);

  yield put({ type: REMOVE_WARRIOR, result })

  yield call(postToast, 'Warrior Added')

  yield call(initialiseCore, data.options, result)

}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga)
]
