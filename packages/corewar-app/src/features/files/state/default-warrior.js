import { guid } from '../../../services/guid'

const defaultSource = `;name Your Warrior's name
;author Your name
;add redcode here`

const defaultWarrior = {
  active: true,
  source: defaultSource,
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
