import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
import { insertItem, removeItem } from './../helpers/arrayHelpers'

import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import { INIT } from './../reducers/simulatorReducers'

import {
  PARSE_REQUESTED,
  PARSE,
  ADD_WARRIOR_REQUESTED,
  ADD_WARRIOR,
  REMOVE_WARRIOR_REQUESTED,
  REMOVE_WARRIOR
} from './../actions/parserActions'

import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'

// sagas
function* parseSaga({ redcode }) {

  let result = yield call([corewar, corewar.parse], redcode)

  const warrior = yield call([corewar, corewar.serialise], result.tokens)

  result.warrior = warrior;

  yield put({ type: PARSE, result, redcode })

}

function* addWarriorSaga() {

  const { standardId, currentParseResult, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  };

  const result = yield call(insertItem, parseResults.length, parseResults, currentParseResult)

  yield put({ type: ADD_WARRIOR, result })

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield call([corewar, corewar.initialiseSimulator], options, result, PubSub);

  yield put({ type: INIT })

}

function* removeWarriorSaga({ index }) {

  console.log('remove_warrior', index)

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  };

  const result = removeItem(index, parseResults);

  yield put({ type: REMOVE_WARRIOR, result })

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield call([corewar, corewar.initialiseSimulator], options, result, PubSub);

  yield put({ type: INIT });

}

// watchers
export default function* parserWatchers() {
  yield all([
    takeLatest(PARSE_REQUESTED, parseSaga),
    takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
    takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga)
  ])
}