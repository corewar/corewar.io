import { channel } from 'redux-saga'
import { call, put, takeEvery, takeLatest, select, take } from 'redux-saga/effects'

import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

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
  GET_CORE_INSTRUCTIONS,
  GET_CORE_INSTRUCTIONS_REQUESTED,
  SET_CORE_FOCUS,
  SET_PROCESS_RATE,
  SET_PROCESS_RATE_REQUESTED,
  SET_CORE_OPTIONS,
  SET_CORE_OPTIONS_REQUESTED
} from './../actions/simulatorActions'

import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'
import { getCoreOptions, CoreOptions } from './coreOptions'

// oddities
let runner = null
let operations = 0
const roundProgressChannel = channel()
const roundEndChannel = channel()

// sagas
export function* initSaga() {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  yield call(initialiseCore, data.options, data.parseResults)

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

function* runSaga() {

  const data = yield call(getCoreOptionsFromState)

  const { processRate } = yield select(getSimulatorState)

  if(data.result.outcome) {
    yield call(initialiseCore, data.options, data.parseResults)
  }

  yield call(PubSub.unsubscribe, 'RUN_PROGRESS')
  yield call(PubSub.subscribe, 'RUN_PROGRESS', sendRoundProgress)

  yield call(PubSub.unsubscribe, 'ROUND_END')
  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)

  yield put({ type: RUN })

  runner = yield call(window.setInterval, () => {

    corewar.step(processRate)

    //operations += processRate

    // // TODO: This should be controlled by the simulator
    // if(operations >= 80000) {
    //   window.clearInterval(runner)
    //   operations = 0
    // }

  }, 1000/60)

}

export function* pauseSaga() {

  const { isRunning } = yield select(getSimulatorState)

  if(isRunning) {
    yield call(window.clearInterval, runner)
    yield put({ type: PAUSE })
  }
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

  yield call(PubSub.unsubscribe, 'ROUND_END')
  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)

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

  yield call(window.clearInterval, runner)

  runner = yield call(window.setInterval, () => {

    for(let i = 0; i < rate; i++) {
      corewar.step()
    }

    // operations += rate

    // // TODO: This should be controlled by the simulator
    // if(operations === 80000) {
    //   window.clearInterval(runner)
    //   operations = 0
    // }
  }, 1000/60)
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
    yield call(window.clearInterval, runner)
    const action = yield take(roundEndChannel)
    yield put(action)
  }
}

const sendRoundProgress = (msg, data) => {
  roundProgressChannel.put({
    type: RUN_PROGRESS,
    data: data.payload
  })
}

const sendRoundEnd = (msg, data) => {
  roundEndChannel.put({
    type: RUN_ENDED,
    data: data.payload
  })
}

// watchers
export const simulatorWatchers = [
  takeLatest(INIT_REQUESTED, initSaga),
  takeEvery(STEP_REQUESTED, stepSaga),
  takeEvery(PAUSE_REQUESTED, pauseSaga),
  takeLatest(FINISH_REQUESTED, finishSaga),
  takeLatest(RUN_REQUESTED, runSaga),
  takeLatest(SET_CORE_OPTIONS_REQUESTED, setCoreOptionsSaga),
  takeLatest(GET_CORE_INSTRUCTIONS_REQUESTED, getCoreInstructionsSaga),
  takeLatest(SET_PROCESS_RATE_REQUESTED, setProcessRateSaga),
  takeEvery(roundProgressChannel, watchRoundProgressChannel),
  takeEvery(roundEndChannel, watchRoundEndChannel)
]
