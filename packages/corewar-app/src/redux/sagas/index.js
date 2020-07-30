import { all } from 'redux-saga/effects'

import { fileWatchers } from '../../features/files/sagas'

export default function* rootSaga() {
  yield all([...fileWatchers])
}
