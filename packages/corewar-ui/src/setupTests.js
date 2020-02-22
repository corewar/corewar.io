import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

configure({ adapter: new Adapter() })
