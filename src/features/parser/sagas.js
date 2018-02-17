import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem } from '../../helpers/arrayHelpers'
import { createHash, getIdenticon } from '../common/identicon'
import { toast } from '../notifications/sagas'
import { corewar } from 'corewar'

import {
  PARSE,
  PARSE_REQUESTED,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR_REQUESTED,
  SHOW_MESSAGES,
  HIDE_MESSAGES,
  SET_WARRIORS,
  LOAD_WARRIOR_REQUESTED,
  LOAD_WARRIOR
} from './actions'

import { PAUSE } from '../simulator/actions'

import { getParserState } from './reducer'
import { getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

// sagas
export function* parseSaga({ source }) {

  const parseResult = yield call([corewar, corewar.parse], source)

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const hash = createHash(compiled)

  const currentWarrior = { ...parseResult, compiled, source, hash }

  if(currentWarrior.messages.find(x => x.type === 0)){
    yield put({ type: SHOW_MESSAGES })
  } else {
    yield put({ type: HIDE_MESSAGES})
  }

  yield put({ type: PARSE, currentWarrior })

}

export function* addWarriorSaga() {

  yield put({ type: PAUSE })

  const data = yield call(getCoreOptionsFromState)

  const { warriors, currentWarrior } = yield select(getParserState)

  const icon = getIdenticon(currentWarrior.compiled, warriors.length)

  const warriorList = yield call(insertItem, warriors.length, warriors, { ...currentWarrior, icon })

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(initialiseCore, data.options, warriorList)

  yield call(toast, 'Warrior Added')
}

export function* loadWarriorSaga({ hash }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.hash === hash)

  yield put({ type: LOAD_WARRIOR, warrior })

}

export function* removeWarriorSaga({ index }) {

  yield put({ type: PAUSE })

  const data = yield call(getCoreOptionsFromState)

  const { warriors } = yield select(getParserState)

  const warriorList = yield call(removeItem, index, warriors)

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(initialiseCore, data.options, warriorList)

  yield call(toast, 'Warrior Removed')
}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga),
  takeEvery(LOAD_WARRIOR_REQUESTED, loadWarriorSaga)
]
