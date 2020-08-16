import { warriorLibrary } from './warrior-library'

// workaround as can't import colours direct from tailwind config as it falls outside of 'src'
const warriorColours = [
  { id: null, hex: '#56CCF2' },
  { id: null, hex: '#EB5757' },
  { id: null, hex: '#F2C94C' },
  { id: null, hex: '#6FCF97' },
  { id: null, hex: '#BB6BD9' },
  { id: null, hex: '#FA824C' },
  { id: null, hex: '#9FD356' },
  { id: null, hex: '#83C5BE' },
  { id: null, hex: '#FFDDD2' },
  { id: null, hex: '#B74F6F' },
  { id: null, hex: '#ADBDFF' }
]

const initialState = {
  currentFile: null,
  files: [],
  warriorLibrary: warriorLibrary,
  standardId: 2, // TODO: what's the best standard to use as a default?
  colours: warriorColours
}

export default initialState
