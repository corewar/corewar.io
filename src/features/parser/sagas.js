import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeById, replaceItemByKey, replaceById } from '../../helpers/arrayHelpers'
import { createHash, getIdenticon } from '../common/identicon'
import { toast } from '../notifications/sagas'
import { corewar } from 'corewar'
import { guid } from '../../helpers/guid'
import blankWarrior from '../../helpers/blankWarrior'

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
  LOAD_FILE_REQUESTED,
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

  yield call(maybeInit, warriorList)

  if(hasErrors){
    yield put({ type: SHOW_CONSOLE })
  } else {
    yield put({ type: HIDE_CONSOLE })
  }

}

export function* addWarriorSaga() {

  yield put({ type: PAUSE })

  const { warriors } = yield select(getParserState)

  const id = guid()

  const colour = yield call(takeColour, id)

  const icon = getIdenticon(blankWarrior.compiled, colour.hex, 20)

  const currentWarrior = { ...blankWarrior, data: { ...blankWarrior.data, id, icon, active: true }}

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior })

  const warriorList = yield call(insertItem, warriors.length, warriors, currentWarrior)

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(maybeInit, warriorList)

}

export function* removeWarriorSaga({ id }) {

  yield put({ type: PAUSE })

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

  yield call(maybeInit, warriorList)

  yield call(toast, 'Warrior Removed')
}

export function* toggleWarriorSaga({ id }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.data.id === id)

  const warriorList = yield call(replaceById, id, warriors, { ...warrior, data: { ...warrior.data, active: !warrior.data.active }})

  yield put({ type: SET_WARRIORS, warriors: warriorList })

  yield call(maybeInit, warriorList)

}

export function* loadWarriorSaga({ id }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.data.id === id)

  yield put({ type: SET_CURRENT_WARRIOR, currentWarrior: warrior })

  yield put({ type: LOAD_WARRIOR, warrior })

}

export function* loadFileSaga({ source }) {
  //TODO: there is a delay at the end of addWarrior (1000ms)
  //which impacts on the parse speed, could improve this
  yield call(addWarriorSaga)
  yield call(parseWarriorSaga, { source })
}

// internal helper functions - not exported
function* maybeInit(warriors) {

  const validWarriors = warriors.filter(x => !x.data.hasErrors && x.data.active)

  if(validWarriors.length > 0) {
    const { options } = yield call(getCoreOptionsFromState)
    yield call(initialiseCore, options, validWarriors)
  }

}

function* getColour(id) {
  const { colours } = yield select(getParserState)
  return colours.find(x => x.id === id)
}

function* takeColour(id) {

  const { colours } = yield select(getParserState)

  const nextAvailable = colours.filter(x => x.id === null)[0]

  nextAvailable.id = id

  const updatedColours = replaceItemByKey('hex', nextAvailable.hex, colours, nextAvailable)

  yield put({ type: SET_COLOURS, colours: updatedColours })

  return nextAvailable

}

function* releaseColour(id) {

  const assignedColour = yield call(getColour, id)

  assignedColour.id = null

  const { colours } = yield select(getParserState)

  const updatedColours = replaceItemByKey('hex', assignedColour.hex, colours, assignedColour)

  yield put({ type: SET_COLOURS, colours: updatedColours })

}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseWarriorSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga),
  takeEvery(LOAD_WARRIOR_REQUESTED, loadWarriorSaga),
  takeEvery(LOAD_FILE_REQUESTED, loadFileSaga),
  takeEvery(TOGGLE_WARRIOR_REQUESTED, toggleWarriorSaga)
]
