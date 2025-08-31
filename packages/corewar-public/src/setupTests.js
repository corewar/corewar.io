// Polyfill for TextEncoder in Node.js environment - must be first!
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Also polyfill for browser APIs that might be missing
if (typeof global.window === 'undefined') {
  global.window = {}
}

// Configure enzyme for React 18
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configure enzyme
configure({ adapter: new Adapter() })
