import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

// Ensure clean initial state on every page load
const initialState = {}
const enhancers = []
const middleware = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(
      devToolsExtension({
        // Completely disable state persistence
        shouldHotReload: false,
        shouldCatchErrors: true,
        // Disable all persistence features
        features: {
          persist: false,
          export: true,
          import: false,
          jump: true,
          skip: true,
          reorder: true,
          dispatch: true,
          test: true
        }
      })
    )
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(createRootReducer(), initialState, composedEnhancers)

// then run the saga
sagaMiddleware.run(rootSaga)

export default store
