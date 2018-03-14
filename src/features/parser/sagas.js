import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem, replaceItem } from '../../helpers/arrayHelpers'
import { createHash, getIdenticon } from '../common/identicon'
import { toast } from '../notifications/sagas'
import { corewar } from 'corewar'

import {
  PARSE,
  PARSE_REQUESTED,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR_REQUESTED,
  SHOW_CONSOLE,
  HIDE_CONSOLE,
  SET_WARRIORS,
  LOAD_WARRIOR_REQUESTED,
  LOAD_WARRIOR,
  TOGGLE_WARRIOR_REQUESTED,
  TOGGLE_WARRIOR,
  SET_CURRENT_FILE_INDEX
} from './actions'

import { PAUSE } from '../simulator/actions'

import { getParserState } from './reducer'
import { getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

// sagas
export function* parseSaga({ source }) {

  const parseResult = yield call([corewar, corewar.parse], source)

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const hash = createHash(compiled)

  const currentWarrior = { ...parseResult, compiled, source, hash, active: true }

  if(currentWarrior.messages.find(x => x.type === 0)){
    yield put({ type: SHOW_CONSOLE })
  } else {
    yield put({ type: HIDE_CONSOLE })
  }

  yield put({ type: PARSE, currentWarrior })

}

export function* parseWarriorSaga({ source }) {

  yield put({ type: PAUSE })

  const parseResult = yield call([corewar, corewar.parse], source)

  const hasErrors = parseResult.messages.find(x => x.type === 0)

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const hash = createHash(compiled)

  const { warriors, currentFileIndex } = yield select(getParserState)

  const icon = getIdenticon(compiled, currentFileIndex)

  const currentWarrior = { ...parseResult, compiled, source, hash, icon, hasErrors }

  yield put({ type: PARSE, currentWarrior })

  if(hasErrors){
    yield put({ type: SHOW_CONSOLE })
  } else {
    yield put({ type: HIDE_CONSOLE })

    const warriorList = yield call(replaceItem, currentFileIndex, warriors, currentWarrior)

    yield put({ type: SET_WARRIORS, warriors: warriorList })

    const data = yield call(getCoreOptionsFromState)

    yield call(initialiseCore, data.options, warriorList.filter(x => !x.hasErrors))
  }


}

export function* addWarriorSaga() {

  yield put({ type: PAUSE })

  const data = yield call(getCoreOptionsFromState)

  const { warriors, currentWarrior } = yield select(getParserState)

  console.log('add', warriors)

  const icon = getIdenticon(currentWarrior.compiled, warriors.length)

  yield put({ type: SET_CURRENT_FILE_INDEX, fileIndex: warriors.length })

  const warriorList = yield call(insertItem, warriors.length, warriors, { ...currentWarrior, icon })

  console.log('add', warriorList)

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(initialiseCore, data.options, warriorList)

  yield call(toast, 'Warrior Added')
}

export function* loadWarriorSaga({ hash, i }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.hash === hash)

  yield put({ type: SET_CURRENT_FILE_INDEX, fileIndex: i })

  yield put({ type: LOAD_WARRIOR, warrior })

}

export function* toggleWarriorSaga({ i }) {

  // TODO: need to differentiate between warriors in and out of the core
  // files & warriors?
  // warriors { active: t/f }?
  const { warriors } = yield select(getParserState)

  const warrior = warriors[i]

  const removedList = yield call(removeItem, i, warriors)
  // TODO: prevent toggle, or even option to toggle if there are errors?
  const warriorList = yield call(insertItem, i, removedList, { ...warrior, active: !warrior.active })

  yield put({ type: SET_WARRIORS, warriors: warriorList })

}

export function* removeWarriorSaga({ index }) {

  yield put({ type: PAUSE })

  const data = yield call(getCoreOptionsFromState)

  const { warriors } = yield select(getParserState)

  if(index === warriors.length) {
    yield put({ type: SET_CURRENT_FILE_INDEX, fileIndex: index - 1 })
  }

  const warriorList = yield call(removeItem, index, warriors)

  const newIcons = warriorList.map((warrior, i) =>
    ({ ...warrior, icon: getIdenticon(warrior.compiled, i) })
  )

  yield put({ type: SET_WARRIORS, warriors: newIcons })

  yield call(initialiseCore, data.options, newIcons)

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
