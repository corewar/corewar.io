import { combineReducers } from 'redux'

import documentation from '../features/documentation/reducer'
import feedback from '../features/feedback/reducer'
import interfaceMode from '../features/interfaceModeSelector/reducer'
import parser from '../features/parser/reducer'
import signup from '../features/signup/reducer'
import simulator from '../features/simulator/reducer'

export default combineReducers({
  parser,
  simulator,
  signup,
  documentation,
  feedback,
  interfaceMode
})
