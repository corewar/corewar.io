import { combineReducers } from 'redux'

import file from '../../features/files/reducer'
import simulator from '../../features/simulator/reducer'

const createRootReducer = () =>
  combineReducers({
    file,
    simulator
  })

export default createRootReducer
