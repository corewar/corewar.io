import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import {
  INIT,
  INIT_REQUESTED,
  STEP,
  STEP_REQUESTED,
  RUN,
  RUN_REQUESTED,
  PAUSE,
  PAUSE_REQUESTED,
  RUN_PROGRESS,
  RUN_PROGRESS_REQUESTED,
  RUN_ENDED,
  RUN_ENDED_REQUESTED,
  FINISH,
  FINISH_REQUESTED,
  GET_CORE_INSTRUCTIONS,
  GET_CORE_INSTRUCTIONS_REQUESTED,
  SET_CORE_FOCUS,
  SET_CORE_FOCUS_REQUESTED,
  SET_PROCESS_RATE,
  SET_PROCESS_RATE_REQUESTED
} from './../actions/simulatorActions'


import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'

// oddities
let runner = null;
let operations = 0

// sagas
function* initSaga() {

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  };

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

  yield put({ type: INIT });
}

function* stepSaga() {

  const { focus } = yield select(getSimulatorState)

  yield call([corewar, corewar.step]);

  const lowerLimit = focus - 5;
  const upperLimit = focus + 5;
  const coreInfo = [];

  for (let index = lowerLimit; index <= upperLimit; index++) {
    const info = yield call([corewar, corewar.getWithInfoAt], index)
    info.instruction.isCurrent = index === focus
    coreInfo.push(info)
  }

  yield put({ type: GET_CORE_INSTRUCTIONS, coreInfo })
}

function* runSaga() {

  yield put({ type: RUN })

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit, processRate, isRunning, roundResult } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  }

  if(roundResult.outcome) {

    yield call(PubSub.publishSync, 'RESET_CORE')

    yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub);

    yield put({ type: INIT })
  }

  yield call(PubSub.subscribe, 'RUN_PROGRESS', (msg, data) => {
    call({ type: RUN_PROGRESS, data })
  })

  yield call(PubSub.subscribe, 'ROUND_END', (msg, data) => {
    call(window.clearInterval, runner)
    put({ type: RUN_ENDED, data })
  })

  runner = yield call(window.setInterval, () => {

    for(let i = 0; i < processRate; i++) {
      call([corewar, corewar.step])
    }

    operations += processRate;

    // TODO: This should be controlled by the simulator
    if(operations >= 80000) {
      call(window.clearInterval, runner)
      operations = 0
    }

  }, 1000/60)

}

function* pauseSaga() {

  yield call(window.clearTimeout, runner);

  yield put({ type: PAUSE })

}

function* finishSaga() {

  const { roundResult, coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)
  const { standardId, parseResults } = yield select(getParserState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  }

  if(roundResult.outcome) {

    yield call(PubSub.publishSync, 'RESET_CORE');

    yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

    yield put({ type: INIT })

  }

  yield call(PubSub.subscribe, 'ROUND_END', (msg, data) => {
    put({ type: RUN_ENDED, data })
  })

  yield call([corewar, corewar.run])

}

function* getCoreInstructionsSaga({ address }) {

  const lowerLimit = address - 5;
  const upperLimit = address + 5;
  const coreInfo = [];

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
      call([corewar, corewar.step])
    }

    operations += rate;

    // TODO: This should be controlled by the simulator
    if(operations === 80000) {
      call(window.clearInterval, runner)
      operations = 0
    }
  }, 1000/60)
}

// watchers
export const simulatorWatchers = [
  takeLatest(INIT_REQUESTED, initSaga),
  takeEvery(STEP_REQUESTED, stepSaga),
  takeEvery(PAUSE_REQUESTED, pauseSaga),
  takeLatest(FINISH_REQUESTED, finishSaga),
  takeLatest(RUN_REQUESTED, runSaga),
  takeLatest(GET_CORE_INSTRUCTIONS_REQUESTED, getCoreInstructionsSaga),
  takeLatest(SET_PROCESS_RATE_REQUESTED, setProcessRateSaga)
]
