import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import parser from './parserReducers'
import simulator from './simulatorReducers'

export default combineReducers({
  routing: routerReducer,
  parser,
  simulator
})