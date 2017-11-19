import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import parser from './parser'

export default combineReducers({
  routing: routerReducer,
  parser
})