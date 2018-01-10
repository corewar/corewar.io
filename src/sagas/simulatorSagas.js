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

// oddities
let runner = null
let operations = 0
const roundProgressChannel = channel()
const roundEndChannel = channel()

// sagas
export function* initSaga() {

  yield call(window.clearInterval, runner)

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield put({ type: PAUSE })

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    cyclesBeforeTie: cyclesBeforeTie,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
    maxTasks: maxTasks
  }

  yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

  yield put({ type: INIT })

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

function* watchRoundProgressChannel() {
  while (true) {
    const action = yield take(roundProgressChannel)
    yield put(action)
  }
}

function* watchRoundEndChannel() {
  while(true) {
    const action = yield take(roundEndChannel)
    yield call(window.clearInterval, runner)
    yield put(action)
  }
}

const sendRoundProgress = (msg, data) => {
  roundProgressChannel.put({
    type: RUN_PROGRESS,
    data
  })
}

const sendRoundEnd = (msg, data) => {
  roundEndChannel.put({
    type: RUN_ENDED,
    data
  })
}

function* runSaga() {

  yield put({ type: RUN })

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks, processRate, roundResult } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    cyclesBeforeTie: cyclesBeforeTie,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
    maxTasks: maxTasks
  }

  if(roundResult.outcome) {

    yield call(PubSub.publishSync, 'RESET_CORE')

    yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub);

    yield put({ type: INIT })
  }

  yield call(PubSub.subscribe, 'RUN_PROGRESS', sendRoundProgress)

  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)

  runner = yield call(window.setInterval, () => {

    for(let i = 0; i < processRate; i++) {
      corewar.step()
    }

    operations += processRate

    // TODO: This should be controlled by the simulator
    if(operations >= 80000) {
      console.log('dont think we will ever get here')
      window.clearInterval(runner)
      operations = 0
    }

  }, 1000/60)

}

function* pauseSaga() {

  yield call(window.clearTimeout, runner)

  yield put({ type: PAUSE })

}

function* finishSaga() {

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks, roundResult } = yield select(getSimulatorState)

  if(roundResult.outcome) {

    const options = {
      standard: standardId,
      coresize: coreSize,
      cyclesBeforeTie: cyclesBeforeTie,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
      maxTasks: maxTasks
    }

    yield call(PubSub.publishSync, 'RESET_CORE')

    yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

    yield put({ type: INIT })

  }

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

    operations += rate

    // TODO: This should be controlled by the simulator
    if(operations === 80000) {
      window.clearInterval(runner)
      operations = 0
    }
  }, 1000/60)
}

function* setCoreOptionsSaga({ id }) {

  const { isRunning } = yield select(getSimulatorState)

  if(isRunning) {

    yield call(window.clearTimeout, runner)

    yield put({ type: PAUSE })

    yield call(PubSub.publishSync, 'RESET_CORE')

  }

  const { coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks } = yield call(getCoreOptions, id)

  yield put({ type: SET_CORE_OPTIONS, coreSize, cyclesBeforeTie, minSeparation, instructionLimit, maxTasks, id })

  yield put({ type: INIT })

}

const CoreOptions = {
  Beginner: 1,
  Nano: 2,
  Tiny: 3,
  LimitedProcess: 4,
  Fortress: 5,
  NinetyFourT: 6,
  TinyLimitedProcess: 7
}

const getCoreOptions = (id) => {

  switch (id) {
    case CoreOptions.Beginner:
      return {
        coreSize: 8000,
        cyclesBeforeTie: 80000,
        maxTasks: 8000,
        minSeparation: 100,
        instructionLimit: 100
      }
    case CoreOptions.Nano:
      return {
        coreSize: 80,
        cyclesBeforeTie: 800,
        maxTasks: 80,
        minSeparation: 5,
        instructionLimit: 5
      }

    case CoreOptions.Tiny:
      return {
        coreSize: 800,
        cyclesBeforeTie: 8000,
        maxTasks: 800,
        minSeparation: 20,
        instructionLimit: 20
      }

    case CoreOptions.LimitedProcess:
      return {
        coreSize: 8000,
        cyclesBeforeTie: 80000,
        maxTasks: 8,
        minSeparation: 200,
        instructionLimit: 200
      }

    case CoreOptions.Fortress:
      return {
        coreSize: 8000,
        cyclesBeforeTie: 80000,
        maxTasks: 80,
        minSeparation: 4000,
        instructionLimit: 400
      }

    case CoreOptions.NinetyFourT:
      return {
        coreSize: 8192,
        cyclesBeforeTie: 100000,
        maxTasks: 8000,
        minSeparation: 300,
        instructionLimit: 300
      }

    case CoreOptions.TinyLimitedProcess:
      return {
        coreSize: 800,
        cyclesBeforeTie: 8000,
        maxTasks: 8,
        minSeparation: 50,
        instructionLimit: 50
      }

    default:
      return {}
  }

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
