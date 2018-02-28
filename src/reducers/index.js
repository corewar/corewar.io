import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import parser from '../features/parser/reducer'
import simulator from '../features/simulator/reducer'
import notification from '../features/notifications/reducer'
import signup from '../features/signup/reducer'
import tutorial from '../features/tutorial/reducer'

export default combineReducers({
  routing: routerReducer,
  parser,
  simulator,
  notification,
  signup,
  tutorial
})