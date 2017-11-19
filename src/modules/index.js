import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import parser from './parser'
import simulator from './simulator'

export default combineReducers({
  routing: routerReducer,
  parser,
  simulator
})