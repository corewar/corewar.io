import { all } from 'redux-saga/effects'

import { parserWatchers } from '../features/parser/sagas'
import { simulatorWatchers } from '../features/simulator/sagas'

export default function* rootSaga() {
  yield all([
    ...parserWatchers,
    ...simulatorWatchers
  ])
}