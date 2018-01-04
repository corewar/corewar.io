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
  SET_PROCESS_RATE_REQUESTED
} from './../actions/simulatorActions'


import { getParserState } from './../reducers/parserReducers'
import { getSimulatorState } from './../reducers/simulatorReducers'

// oddities
let runner = null;
let operations = 0
const roundProgressChannel = channel()
const roundEndChannel = channel()

// sagas
function* initSaga() {

  yield call(window.clearTimeout, runner)

  yield call(PubSub.publishSync, 'RESET_CORE')

  yield put({ type: PAUSE })

  const { standardId, parseResults } = yield select(getParserState)
  const { coreSize, minSeparation, instructionLimit } = yield select(getSimulatorState)

  const options = {
    standard: standardId,
    coresize: coreSize,
    minSeparation: minSeparation,
    instructionLimit: instructionLimit,
  };

  yield call([corewar, corewar.initialiseSimulator], options, parseResults, PubSub)

  yield put({ type: INIT })

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
  const { coreSize, minSeparation, instructionLimit, processRate, roundResult } = yield select(getSimulatorState)

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

  yield call(PubSub.subscribe, 'RUN_PROGRESS', sendRoundProgress)

  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)

  runner = window.setInterval(() => {

    for(let i = 0; i < processRate; i++) {
      corewar.step()
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

  yield call(window.clearTimeout, runner)

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

  yield call(PubSub.subscribe, 'ROUND_END', sendRoundEnd)

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
      corewar.step()
    }

    operations += rate;

    // TODO: This should be controlled by the simulator
    if(operations === 80000) {
      window.clearInterval(runner)
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
  takeLatest(SET_PROCESS_RATE_REQUESTED, setProcessRateSaga),
  takeEvery(roundProgressChannel, watchRoundProgressChannel),
  takeEvery(roundEndChannel, watchRoundEndChannel)
]
