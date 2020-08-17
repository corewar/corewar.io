import { all } from 'redux-saga/effects'

import { fileWatchers } from '../../features/files/sagas'
import { simulatorWatchers } from '../../features/simulator/sagas'

export default function* rootSaga() {
  yield all([...fileWatchers, ...simulatorWatchers])
}
