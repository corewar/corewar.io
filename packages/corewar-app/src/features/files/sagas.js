import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeById, replaceItemByKey, replaceById } from '../../services/array'
import { createHash, getIdenticon } from '../../services/identicon'
import { guid } from '../../services/guid'
import { corewar } from 'corewar'
import defaultWarrior from './state/default-warrior'

import {
  SET_CURRENT_FILE,
  PARSE_REQUESTED,
  NEW_FILE_REQUESTED,
  DELETE_FILE_REQUESTED,
  SET_FILES,
  OPEN_FILE_REQUESTED,
  LOAD_FILE,
  LOAD_FILE_REQUESTED,
  TOGGLE_FILE_REQUESTED,
  SET_COLOURS
} from './actions'

import { PAUSE } from '../simulator/actions'

import { getFileState } from './reducer'
import { getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

/**
 * parseFileSaga - parses a file from redcode into compiled code
 * @param {} param0
 */
export function* parseFileSaga({ source }) {
  yield put({ type: PAUSE })

  const parseResult = yield call([corewar, corewar.parse], source)

  const hasErrors = !parseResult.success

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const hash = createHash(compiled)

  const { files, currentFile } = yield select(getFileState)

  const colour = yield call(getColour, currentFile.data.id)

  const icon = getIdenticon(compiled, colour.hex, 20)

  const data = { ...currentFile.data, hash, icon, hasErrors, colour }

  const updatedFile = { ...parseResult, source, compiled, data }

  yield put({ type: SET_CURRENT_FILE, currentFile: updatedFile })

  const fileList = yield call(replaceById, currentFile.data.id, files, updatedFile)

  yield put({ type: SET_FILES, files: fileList })

  yield call(maybeInit, fileList)
}

/**
 * newFileSaga - adds a new blank file into the system
 * It's added to the list of files
 * It's given a unique(isH) colour
 * It's given an icon based on the compiled code, but this is based on the default warrior
 * It's loaded into the core by default - TODO: may need to check for errors first
 */
export function* newFileSaga() {
  yield put({ type: PAUSE })

  const { files } = yield select(getFileState)

  const id = yield call(guid)

  const colour = yield call(takeColour, id)

  const icon = getIdenticon(defaultWarrior.compiled, colour.hex, 20)

  const currentFile = {
    ...defaultWarrior,
    data: { ...defaultWarrior.data, id, icon, loaded: true }
  }

  yield put({ type: SET_CURRENT_FILE, currentFile })

  const fileList = yield call(insertItem, files.length, files, currentFile)

  yield put({ type: SET_FILES, files: fileList })

  yield call(maybeInit, fileList)
}

/**
 * deleteFileSaga - Removes a file from the system
 * If there is another file, picks the last one and sets it to the currentFile
 * @param {id} param0
 */
export function* deleteFileSaga({ id }) {
  yield put({ type: PAUSE })

  const { files } = yield select(getFileState)

  const fileList = yield call(removeById, id, files)

  yield call(releaseColour, id)

  yield put({ type: SET_FILES, files: fileList })

  yield put({ type: SET_CURRENT_FILE, currentFile: fileList[0] })

  yield call(maybeInit, fileList)
}

/**
 * toggleFileSaga - switches a file between 'loaded' and '!loaded'
 * This represents whether or not the file is loaded into the core
 * @param { id } The id of the file to be toggled into or out of the core
 */
export function* toggleFileSaga({ id }) {
  const { files } = yield select(getFileState)

  const file = files.find(x => x.data.id === id)

  const fileList = yield call(replaceById, id, files, {
    ...file,
    data: { ...file.data, loaded: !file.data.loaded }
  })

  yield put({ type: SET_FILES, files: fileList })

  yield call(maybeInit, fileList)
}

// TODO: Pretty sure this is more "select file"
// or is the file picking from the warrior library?
// think the former
export function* loadFileSaga({ id }) {
  const { files } = yield select(getFileState)

  const file = files.find(x => x.data.id === id)

  yield put({ type: SET_CURRENT_FILE, currentFile: file })

  yield put({ type: LOAD_FILE, file })
}

export function* openFileSaga({ source }) {
  //TODO: there is a delay at the end of addWarrior (1000ms)
  //which impacts on the parse speed, could improve this
  yield call(newFileSaga)
  yield call(parseFileSaga, { source })
}

// internal helper functions - not exported
function* maybeInit(files) {
  const validFiles = files.filter(x => !x.data.hasErrors && x.data.loaded)

  if (validFiles.length > 0) {
    const { options } = yield call(getCoreOptionsFromState)
    yield call(initialiseCore, options, validFiles)
  }
}

function* getColour(id) {
  const { colours } = yield select(getFileState)
  return colours.find(x => x.id === id)
}

function* takeColour(id) {
  const { colours } = yield select(getFileState)

  const nextAvailable = colours.filter(x => x.id === null)[0]

  if (!nextAvailable) {
    return { hex: '#FFFFFF' }
  }

  nextAvailable.id = id

  const updatedColours = replaceItemByKey('hex', nextAvailable.hex, colours, nextAvailable)

  yield put({ type: SET_COLOURS, colours: updatedColours })

  return nextAvailable
}

function* releaseColour(id) {
  const assignedColour = yield call(getColour, id)

  if (!assignedColour) {
    return
  }

  assignedColour.id = null

  const { colours } = yield select(getFileState)

  const updatedColours = replaceItemByKey('hex', assignedColour.hex, colours, assignedColour)

  yield put({ type: SET_COLOURS, colours: updatedColours })
}

// watchers
export const fileWatchers = [
  takeLatest(PARSE_REQUESTED, parseFileSaga),
  takeEvery(NEW_FILE_REQUESTED, newFileSaga),
  takeEvery(DELETE_FILE_REQUESTED, deleteFileSaga),
  takeEvery(LOAD_FILE_REQUESTED, loadFileSaga),
  takeEvery(OPEN_FILE_REQUESTED, openFileSaga),
  takeEvery(TOGGLE_FILE_REQUESTED, toggleFileSaga)
]
