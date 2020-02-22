import { defaultWarriors } from '../../helpers/defaultWarriors'
import blankWarrior from '../../helpers/blankWarrior'
import { colour } from '../common/theme'

const initialState = {
  currentFileIndex: 0,
  currentWarrior: blankWarrior,
  warriors: [],
  warriorLibrary: defaultWarriors,
  standardId: 2, // TODO: what's the best standard to use as a default?
  displayConsole: false,
  displayFileManager: false,
  colours: colour.warrior
}

export default initialState