import { getIdenticon } from '../features/common/identicon'
import { guid } from '../helpers/guid'

const blankSource = ''

const icon = getIdenticon(blankSource, 0, 20)

const newWarrior = {
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
    icon: icon
  }
}

export default newWarrior