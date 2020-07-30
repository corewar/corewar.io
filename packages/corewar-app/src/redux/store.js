import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

import createRootReducer from './reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const enhancers = []
const middleware = [sagaMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(createRootReducer(history), initialState, composedEnhancers)

// then run the saga
sagaMiddleware.run(rootSaga)

export default store
