import { channel } from 'redux-saga'
import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
  fork,
  delay,
  actionChannel
} from 'redux-saga/effects'
import * as PubSub from 'pubsub-js'
import { corewar } from 'corewar'

import {
  INIT,
  INIT_REQUESTED,
  STEP_REQUESTED,
  RUN,
  RUN_REQUESTED,
  PAUSE,
  RUN_PROGRESS,
  RUN_ENDED,
  FINISH_REQUESTED,
  START_REQUESTED,
  REPUBLISH,
  REPUBLISH_REQUESTED,
  GET_CORE_INSTRUCTIONS,
  GET_CORE_INSTRUCTIONS_REQUESTED,
  SET_CORE_FOCUS,
  SET_PROCESS_RATE,
  SET_PROCESS_RATE_REQUESTED,
  SET_CORE_OPTIONS,
  SET_CORE_OPTIONS_REQUESTED
} from './actions'

import { getFileState } from '../files/reducer'
import { getSimulatorState } from './reducer'
import { getCoreOptions } from '../../services/core-options'

// oddities
const roundProgressChannel = channel()
const roundEndChannel = channel()

// sagas
export function* initSaga() {
  yield put({ type: PAUSE })

  const data = yield call(getCoreOptionsFromState)

  yield call(initialiseCore, data.options, data.warriors)
}

export function* addMessageSubscriptions() {
  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)
  yield call(PubSub.subscribe, 'RUN_PROGRESS', sendRoundProgress)
}

function* stepSaga() {
  const { focus } = yield select(getSimulatorState)

  yield call([corewar, corewar.step])

  const lowerLimit = focus - 5
  const upperLimit = focus + 5
  const coreInfo = []

  for (let index = lowerLimit; index <= upperLimit; index++) {
    const info = yield call([corewar, corewar.getWithInfoAt], index)
    info.instruction.isCurrent = index === focus
    coreInfo.push(info)
  }

  yield put({ type: GET_CORE_INSTRUCTIONS, coreInfo })
}

export function* runSaga() {
  const data = yield call(getCoreOptionsFromState)

  if (data.result.outcome) {
    yield call(initialiseCore, data.options, data.warriors)
  }

  yield put({ type: RUN })

  yield put({ type: START_REQUESTED })

  // runChannel.put({
  //   type: START_REQUESTED
  // })
}

export function* renderCoreSaga() {
  const runChannel = yield actionChannel(START_REQUESTED)
  const interval = 1000 / 60

  while (yield take(runChannel)) {
    while (true) {
      yield delay(interval)

      const { isRunning, processRate } = yield select(getSimulatorState)

      // if the state says we're running, call a step
      if (isRunning) {
        yield call([corewar, corewar.step], processRate)
      } else {
        // Otherwise, go idle until we get another put to `runChannel`
        break
      }
    }
  }
}

export function* republishSaga() {
  yield call([corewar, corewar.republish])

  yield put({ type: REPUBLISH })
}

export function* getCoreOptionsFromState() {
  const { standardId, files } = yield select(getFileState)
  const {
    coreSize,
    maximumCycles,
    minSeparation,
    instructionLimit,
    maxTasks,
    roundResult
  } = yield select(getSimulatorState)

  const p = {
    result: roundResult,
    warriors: files,
    options: {
      standard: standardId,
      coresize: coreSize,
      maximumCycles: maximumCycles,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
      maxTasks: maxTasks
    }
  }

  return p
}

export function* initialiseCore(options, files) {
  yield call(PubSub.publishSync, 'RESET_CORE')
  yield call(
    [corewar, corewar.initialiseSimulator],
    options,
    files.map(file => ({ data: file.data, source: file })),
    PubSub
  )

  yield put({ type: INIT })
}

export function* finishSaga() {
  const data = yield call(getCoreOptionsFromState)

  if (data.result.outcome) {
    yield call(initialiseCore, data.options, data.warriors)
  }

  yield call([corewar, corewar.run])
}

function* getCoreInstructionsSaga({ address }) {
  const lowerLimit = address - 5
  const upperLimit = address + 5
  const coreInfo = []

  for (let index = lowerLimit; index <= upperLimit; index++) {
    const info = yield call([corewar, corewar.getWithInfoAt], index)
    info.instruction.isCurrent = index === address
    coreInfo.push(info)
  }

  yield put({ type: SET_CORE_FOCUS, focus: address })

  yield put({ type: GET_CORE_INSTRUCTIONS, coreInfo })
}

function* setProcessRateSaga({ rate }) {
  yield put({ type: SET_PROCESS_RATE, rate })
}

function* setCoreOptionsSaga({ id }) {
  yield put({ type: PAUSE })

  yield call(PubSub.publishSync, 'RESET_CORE')

  const { coreSize, maximumCycles, minSeparation, instructionLimit, maxTasks } = yield call(
    getCoreOptions,
    id
  )

  yield put({
    type: SET_CORE_OPTIONS,
    coreSize,
    maximumCycles,
    minSeparation,
    instructionLimit,
    maxTasks,
    id
  })

  yield call(initSaga)
}

function* watchRoundProgressChannel() {
  while (true) {
    const action = yield take(roundProgressChannel)
    yield put(action)
  }
}

function* watchRoundEndChannel() {
  while (true) {
    yield put({ type: PAUSE })
    const action = yield take(roundEndChannel)
    yield put(action)
  }
}

export const sendRoundProgress = (msg, data) => {
  roundProgressChannel.put({
    type: RUN_PROGRESS,
    data
  })
}

export const sendRoundEnd = (msg, data) => {
  roundEndChannel.put({
    type: RUN_ENDED,
    data
  })
}

// watchers
export const simulatorWatchers = [
  takeLatest(INIT_REQUESTED, initSaga),
  takeEvery(STEP_REQUESTED, stepSaga),
  takeLatest(FINISH_REQUESTED, finishSaga),
  takeLatest(RUN_REQUESTED, runSaga),
  takeLatest(REPUBLISH_REQUESTED, republishSaga),
  takeLatest(SET_CORE_OPTIONS_REQUESTED, setCoreOptionsSaga),
  takeLatest(GET_CORE_INSTRUCTIONS_REQUESTED, getCoreInstructionsSaga),
  takeLatest(SET_PROCESS_RATE_REQUESTED, setProcessRateSaga),
  fork(watchRoundProgressChannel),
  fork(watchRoundEndChannel),
  fork(renderCoreSaga),
  fork(addMessageSubscriptions)
]
