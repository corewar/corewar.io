import { guid } from '../helpers/guid'

const blankSource = ''

const blankWarrior = {
  active: true,
  source: blankSource,
  compiled: '',
  metaData: {
    name: 'Nameless',
    author: 'Blameless'
  },
  tokens: [],
  data: {
    id: guid(),
    hasErrors: true,
    hash: '',
    icon: null
  }
}

export default blankWarrior