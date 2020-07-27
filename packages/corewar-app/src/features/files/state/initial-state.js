import { warriorLibrary } from './warrior-library'
import defaultWarrior from './default-warrior'

const initialState = {
  currentFileIndex: 0,
  currentFile: defaultWarrior,
  files: [],
  warriorLibrary: warriorLibrary,
  standardId: 2 // TODO: what's the best standard to use as a default?
  //   displayConsole: false,
  //   displayFileManager: false,
  //colours: colour.warrior
}

export default initialState
