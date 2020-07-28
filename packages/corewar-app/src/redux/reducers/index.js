import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import file from '../../features/files/reducer'
import simulator from '../../features/simulator/reducer'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    file,
    simulator
  })

export default createRootReducer
