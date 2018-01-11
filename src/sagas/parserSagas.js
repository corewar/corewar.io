import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { insertItem, removeItem } from './../helpers/arrayHelpers'

import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import {
  INIT,
  PAUSE
} from './../actions/simulatorActions'

import {
  PARSE,
  PARSE_REQUESTED,
  ADD_WARRIOR,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR,
  REMOVE_WARRIOR_REQUESTED
} from './../actions/parserActions'

import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'
import { pauseSaga, getCoreOptionsFromState, initialiseCore } from './simulatorSagas'

// sagas
export function* parseSaga({ redcode }) {

  let result = yield call([corewar, corewar.parse], redcode)

  const warrior = yield call([corewar, corewar.serialise], result.tokens)

  result.warrior = warrior;

  yield put({ type: PARSE, result, redcode })

}

function* addWarriorSaga() {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const { currentParseResult } = yield select(getParserState)

  const result = yield call(insertItem, data.parseResults.length, data.parseResults, currentParseResult)

  yield put({ type: ADD_WARRIOR, result })

  yield call(initialiseCore, data.options, result)

}

function* removeWarriorSaga({ index }) {

  const data = yield call(getCoreOptionsFromState)

  const result = yield call(removeItem, index, data.parseResults);

  yield put({ type: REMOVE_WARRIOR, result })

  yield call(initialiseCore, data.options, data.parseResults)

}

// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga)
]
