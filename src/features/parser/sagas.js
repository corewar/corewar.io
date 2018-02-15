import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem } from '../../helpers/arrayHelpers'
import { toast } from '../notifications/sagas'
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
  SET_FILES
} from './actions'

import { getParserState } from './reducer'
import { pauseSaga, getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

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

  const { currentParseResult, redcode } = yield select(getParserState)

  const result = yield call(insertItem, data.parseResults.length, data.parseResults, currentParseResult)

  console.log(result)

  const files = result.map((res, i) => ({
    guid: guid(),
    name: `${res.metaData.name} (${i})`,
    author: res.metaData.author,
    redcode: redcode,
    output: res.warrior
  }))

  yield put({ type: ADD_WARRIOR, result })

  yield put({ type: SET_FILES, files })

  yield call(toast, 'Warrior Added')

  yield call(initialiseCore, data.options, result)

}

export function* removeWarriorSaga({ index }) {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const result = yield call(removeItem, index, data.parseResults)

  const files = result.map((res, i) => ({
    name: `${res.metaData.name} (${i})`,
    author: res.metaData.author,
    output: res.warrior
  }))

  yield put({ type: REMOVE_WARRIOR, result })

  yield put({ type: SET_FILES, files })

  yield call(toast, 'Warrior Removed')

  yield call(initialiseCore, data.options, result)

}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga)
]
