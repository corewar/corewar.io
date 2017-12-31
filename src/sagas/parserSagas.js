import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
import { insertItem } from './../helpers/arrayHelpers'

import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import { INIT } from './../reducers/simulatorReducers'

import {
  PARSE_REQUESTED,
  PARSE,
  ADD_WARRIOR_REQUESTED,
  ADD_WARRIOR,
  RESET_CORE
} from './../actions/parserActions'

import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'

// sagas
function* parseSaga(action) {

  let result = yield call([corewar, corewar.parse], action.redcode)

  const warrior = yield call([corewar, corewar.serialise], result.tokens)

  result.warrior = warrior;
  const redcode = action.redcode;

  yield put({ type: PARSE, result, redcode })

}

function* addWarriorSaga() {

  console.log('add warrior')

  const { standardId, currentParseResult, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)

  const result = yield call(insertItem, parseResults.length, parseResults, currentParseResult)

  yield put({ type: ADD_WARRIOR, result })

  yield call(PubSub.publishSync, 'RESET_CORE')

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  };

  yield call([corewar, corewar.initialiseSimulator], options, result, PubSub);

  yield put({ type: INIT });

}

// watchers
export default function* parserWatchers() {
  yield all([
    takeLatest(PARSE_REQUESTED, parseSaga),
    takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga)
  ])
}