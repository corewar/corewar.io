import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root'
import store from './redux/store'
import * as serviceWorker from './serviceWorker'

// Clear any persisted Redux DevTools state on app initialization
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // Clear any persisted state from Redux DevTools
  localStorage.removeItem('redux-devtools')
  sessionStorage.removeItem('redux-devtools')
  // Clear all localStorage items that might contain Redux state
  Object.keys(localStorage).forEach((key) => {
    if (key.includes('redux') || key.includes('devtools')) {
      localStorage.removeItem(key)
    }
  })
}

// Force clear any Redux DevTools state on page load
window.addEventListener('beforeunload', () => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    localStorage.removeItem('redux-devtools')
    sessionStorage.removeItem('redux-devtools')
  }
})

// Suppress ResizeObserver loop error - this is a known issue with ResizeObserver
// and doesn't affect functionality
const originalError = console.error
const originalWarn = console.warn
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('ResizeObserver loop completed with undelivered notifications') ||
      args[0].includes('ResizeObserver loop limit exceeded'))
  ) {
    return
  }
  originalError.call(console, ...args)
}
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('ResizeObserver loop completed with undelivered notifications') ||
      args[0].includes('ResizeObserver loop limit exceeded') ||
      args[0].includes('Support for defaultProps will be removed from function components'))
  ) {
    return
  }
  originalWarn.call(console, ...args)
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
