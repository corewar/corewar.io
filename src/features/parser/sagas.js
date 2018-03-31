import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem, replaceItem, removeById, replaceItemByKey, replaceById } from '../../helpers/arrayHelpers'
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
  TOGGLE_WARRIOR_REQUESTED,
  SET_COLOURS
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

  const { warriors, currentWarrior } = yield select(getParserState)

  const colour = yield call(getColour, currentWarrior.data.id)

  const icon = getIdenticon(compiled, colour.hex, 20)

  const data = { ...currentWarrior.data, hash, icon, hasErrors, colour }

  const updatedWarrior = { ...parseResult, source, compiled, data }

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior: updatedWarrior })

  const warriorList = yield call(replaceById, currentWarrior.data.id, warriors, updatedWarrior)

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

function* takeColour(id) {

  const { colours } = yield select(getParserState)

  const nextAvailable = colours.filter(x => x.id === null)[0]

  nextAvailable.id = id

  const updatedColours = replaceItemByKey('hex', nextAvailable.hex, colours, nextAvailable)

  yield put({ type: SET_COLOURS, colours: updatedColours })

  return nextAvailable

}

function* getColour(id) {
  const { colours } = yield select(getParserState)
  return colours.find(x => x.id === id)
}

function* releaseColour(id) {

  const assignedColour = yield call(getColour, id)

  assignedColour.id = null

  const { colours } = yield select(getParserState)

  const updatedColours = replaceItemByKey('hex', assignedColour.hex, colours, assignedColour)

  yield put({ type: SET_COLOURS, colours: updatedColours })

}

export function* addWarriorSaga() {

  yield put({ type: PAUSE })

  const { options } = yield call(getCoreOptionsFromState)

  const { warriors, colours } = yield select(getParserState)

  const id = guid()

  const colour = yield call(takeColour, id)

  const icon = getIdenticon(newWarrior.compiled, colour.hex, 20)

  const currentWarrior = { ...newWarrior, data: { ...newWarrior.data, id: id, icon, active: true }}

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

  yield call(releaseColour, id)

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
