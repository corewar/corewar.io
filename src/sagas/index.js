import { all } from 'redux-saga/effects'

import { parserWatchers } from './parserSagas'
import { simulatorWatchers } from './simulatorSagas'

export default function* rootSaga() {
  yield all([
    parserWatchers,
    simulatorWatchers
  ])
}