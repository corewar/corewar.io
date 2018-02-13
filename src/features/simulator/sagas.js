import { channel, delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, select, take, fork } from 'redux-saga/effects'
import * as PubSub from 'pubsub-js'
import { corewar } from 'corewar'

import { postToast } from '../notifications/sagas'

import {
  INIT,
  INIT_REQUESTED,
  STEP_REQUESTED,
  RUN,
  RUN_REQUESTED,
  PAUSE,
  PAUSE_REQUESTED,
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

import { getParserState } from '../parser/reducer'
import { getSimulatorState } from './reducer'
import { getCoreOptions } from '../../sagas/coreOptions'

// oddities
const roundProgressChannel = channel()
const roundEndChannel = channel()
const runChannel = channel()

// sagas
export function* initSaga() {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  yield call(initialiseCore, data.options, data.parseResults)

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

  if(data.result.outcome) {
    yield call(initialiseCore, data.options, data.parseResults)
  }

  yield put({ type: RUN })

  runChannel.put({
    type: START_REQUESTED
  })

}

export function* renderCoreSaga() {

  while(yield take(runChannel)) {

    while(true) {

      yield call(delay, 1000/60)

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

export function* pauseSaga() {
  yield put({ type: PAUSE })
}

export function* republishSaga() {

  yield call([corewar, corewar.republish])

  yield put({ type: REPUBLISH })
}

export function* getCoreOptionsFromState() {

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks, roundResult } = yield select(getSimulatorState)

  return {
    result: roundResult,
    parseResults: parseResults,
    options: {
      standard: standardId,
      coresize: coreSize,
      cyclesBeforeTie: cyclesBeforeTie,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
      maxTasks: maxTasks
    }
  }
}

export function* initialiseCore(options, parseResults) {

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

  yield put({ type: INIT })

}

export function* finishSaga() {

  const data = yield call(getCoreOptionsFromState)

  if(data.result.outcome) {
    yield call(initialiseCore, data.options, data.parseResults)
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

  const { isInitialised, isRunning } = yield select(getSimulatorState)

  if(!isInitialised || !isRunning) {
    return
  }

}

function* setCoreOptionsSaga({ id }) {

  yield call(pauseSaga)

  yield call(PubSub.publishSync, 'RESET_CORE')

  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks } = yield call(getCoreOptions, id)

  yield put({ type: SET_CORE_OPTIONS, coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks, id })

  yield put({ type: INIT })

}

function* watchRoundProgressChannel() {
  while (true) {
    const action = yield take(roundProgressChannel)
    yield put(action)
  }
}

function* watchRoundEndChannel() {
  while(true) {
    yield call(pauseSaga)
    const action = yield take(roundEndChannel)
    yield put(action)
    yield call(postToast, `Round Over: ${action.data.outcome}`)
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
  takeEvery(PAUSE_REQUESTED, pauseSaga),
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
