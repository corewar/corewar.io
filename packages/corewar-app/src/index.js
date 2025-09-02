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

// Note: Removed global ResizeObserver error suppression as it was interfering
// with core canvas resizing functionality. The ResizeObserver error is harmless
// and doesn't affect functionality - it's just noise in the console.

// Suppress ResizeObserver loop error - this is a known issue with ResizeObserver
// and doesn't affect functionality
const originalError = console.error
const originalWarn = console.warn

// Override console.error to suppress ResizeObserver errors
console.error = (...args) => {
  const message = args[0]
  if (
    typeof message === 'string' &&
    (message.includes('ResizeObserver loop completed with undelivered notifications') ||
      message.includes('ResizeObserver loop limit exceeded') ||
      message.includes('ResizeObserver loop') ||
      message.includes('ResizeObserver'))
  ) {
    return
  }
  originalError.call(console, ...args)
}

// Override console.warn to suppress ResizeObserver warnings
console.warn = (...args) => {
  const message = args[0]
  if (
    typeof message === 'string' &&
    (message.includes('ResizeObserver loop completed with undelivered notifications') ||
      message.includes('ResizeObserver loop limit exceeded') ||
      message.includes('ResizeObserver loop') ||
      message.includes('ResizeObserver') ||
      message.includes('Support for defaultProps will be removed from function components'))
  ) {
    return
  }
  originalWarn.call(console, ...args)
}

// Also suppress ResizeObserver errors at the global error handler level
window.addEventListener('error', (event) => {
  if (
    event.message &&
    (event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
      event.message.includes('ResizeObserver loop limit exceeded') ||
      event.message.includes('ResizeObserver loop'))
  ) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
})

// Suppress unhandled promise rejections related to ResizeObserver
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason &&
    event.reason.message &&
    (event.reason.message.includes(
      'ResizeObserver loop completed with undelivered notifications'
    ) ||
      event.reason.message.includes('ResizeObserver loop limit exceeded') ||
      event.reason.message.includes('ResizeObserver loop'))
  ) {
    event.preventDefault()
    return false
  }
})

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
