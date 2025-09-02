import { guid } from '../../../services/guid'

const createDefaultWarrior = (name, author) => {
  const defaultSource = `;name ${name}
;author ${author}
;comment A simple default warrior

        MOV 0, 1`

  return {
    source: defaultSource,
    compiled: '',
    metaData: {
      name: name,
      author: author
    },
    tokens: [],
    data: {
      id: guid(),
      hasErrors: false, // this was used to prevent empty warriors getting loaded in the core I think
      hash: '',
      icon: null,
      loaded: true // whether or not its loaded into the core
    }
  }
}

export default createDefaultWarrior
