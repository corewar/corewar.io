import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem, replaceItem, removeById } from '../../helpers/arrayHelpers'
import { createHash, getIdenticon } from '../common/identicon'
import { toast } from '../notifications/sagas'
import { corewar } from 'corewar'
import { guid } from '../../helpers/guid'
import newWarrior from '../../helpers/newWarrior'

import {
  SET_CURRENT_WARRIOR,
  PARSE_REQUESTED,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR_REQUESTED,
  SHOW_CONSOLE,
  HIDE_CONSOLE,
  SET_WARRIORS,
  LOAD_WARRIOR_REQUESTED,
  LOAD_WARRIOR,
  TOGGLE_WARRIOR_REQUESTED
} from './actions'

import { PAUSE } from '../simulator/actions'

import { getParserState } from './reducer'
import { getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

// sagas
export function* parseWarriorSaga({ source }) {

  yield put({ type: PAUSE })

  const parseResult = yield call([corewar, corewar.parse], source)

  const hasErrors = parseResult.messages.find(x => x.type === 0) !== undefined

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const hash = createHash(compiled)

  const { warriors, currentFileIndex } = yield select(getParserState)

  const icon = getIdenticon(compiled, currentFileIndex, 20)

  const data = { hash, icon, hasErrors, active: warriors[currentFileIndex].active }

  const currentWarrior = { ...parseResult, source, compiled, data }

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior })

  const warriorList = yield call(replaceItem, currentFileIndex, warriors, currentWarrior)

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  const validWarriors = warriorList.filter(x => !x.data.hasErrors && x.data.active)

  if(validWarriors.length > 0) {
    const { options } = yield call(getCoreOptionsFromState)
    yield call(initialiseCore, options, validWarriors)
  }

  if(hasErrors){
    yield put({ type: SHOW_CONSOLE })
  } else {
    yield put({ type: HIDE_CONSOLE })
  }

}

export function* addWarriorSaga() {

  yield put({ type: PAUSE })

  const { options } = yield call(getCoreOptionsFromState)

  const { warriors } = yield select(getParserState)

  const icon = getIdenticon(newWarrior.compiled, warriors.length, 20)

  const currentWarrior = { ...newWarrior, data: { ...newWarrior.data, id: guid(), icon}}

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior })

  const warriorList = yield call(insertItem, warriors.length, warriors, currentWarrior)

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  const validWarriors = warriorList.filter(x => !x.data.hasErrors && x.data.active)

  if(validWarriors.length > 0) {
    yield call(initialiseCore, options, validWarriors)
  }

  yield call(toast, 'Warrior Added')
}

export function* loadWarriorSaga({ id }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.data.id === id)

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior: warrior })

  yield put({ type: LOAD_WARRIOR, warrior })

}

export function* toggleWarriorSaga({ i }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors[i]

  const updatedList = yield call(replaceItem, i, warriors, { ...warrior, active: !warrior.active })

  yield put({ type: SET_WARRIORS, warriors: updatedList })

  const data = yield call(getCoreOptionsFromState)

  const activeList =  updatedList.filter(x => !x.hasErrors && x.active)

  console.log(activeList)

  yield call(initialiseCore, data.options, activeList)

}

export function* removeWarriorSaga({ id }) {

  yield put({ type: PAUSE })

  const { options } = yield call(getCoreOptionsFromState)

  const { warriors } = yield select(getParserState)

  if(id === warriors[warriors.length - 1].data.id) {
    yield put({ type: SET_CURRENT_WARRIOR, currentWarrior: warriors[warriors.length - 2] })
  }

  const warriorList = yield call(removeById, id, warriors)

  // const newIcons = warriorList.map((warrior, i) =>
  //   ({ ...warrior, icon: getIdenticon(warrior.compiled, i, 20) })
  // )

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(initialiseCore, options, warriorList)

  yield call(toast, 'Warrior Removed')
}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseWarriorSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga),
  takeEvery(LOAD_WARRIOR_REQUESTED, loadWarriorSaga),
  takeEvery(TOGGLE_WARRIOR_REQUESTED, toggleWarriorSaga)
]
