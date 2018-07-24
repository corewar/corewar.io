import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
var chai = require("chai")
var sinonChai = require("sinon-chai")

chai.use(sinonChai)

configure({ adapter: new Adapter() });