import { guid } from '../../../services/guid'

const defaultSource = `;name Your Warrior's name
;author Your name
;add redcode here`

const defaultWarrior = {
  source: defaultSource,
  compiled: '',
  metaData: {
    name: `Your Warrior's name`,
    author: `Your name`
  },
  tokens: [],
  data: {
    id: guid(),
    hasErrors: true, // this was used to prevent empty warriors getting loaded in the core I think
    hash: '',
    icon: null,
    loaded: true // whether or not your loaded into the core
  }
}

export default defaultWarrior
