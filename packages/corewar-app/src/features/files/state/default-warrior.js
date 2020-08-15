import { guid } from '../../../services/guid'
import randomWords from 'random-words'

const warriorName = randomWords({ exactly: 1, wordsPerString: 2 })
const authorName = randomWords({ exactly: 1, wordsPerString: 2 })

const defaultSource = `;name ${warriorName}
;author ${authorName}`

const defaultWarrior = {
  source: defaultSource,
  compiled: '',
  metaData: {
    name: warriorName,
    author: authorName
  },
  tokens: [],
  data: {
    id: guid(),
    hasErrors: false, // this was used to prevent empty warriors getting loaded in the core I think
    hash: '',
    icon: null,
    loaded: true // whether or not your loaded into the core
  }
}

export default defaultWarrior
