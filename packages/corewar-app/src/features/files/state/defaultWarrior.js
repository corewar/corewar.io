import { guid } from '../../../services/guid'

const blankSource = ''

const defaultWarrior = {
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

export default defaultWarrior
