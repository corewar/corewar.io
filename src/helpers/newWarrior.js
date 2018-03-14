import { getIdenticon } from '../features/common/identicon'

const blankSource = ''

const icon = getIdenticon(blankSource, 0)

const newWarrior = {
  source: blankSource,
  compiled: '',
  hasErrors: false,
  hash: '',
  icon: icon,
  metaData: {
    name: 'Nameless',
    author: 'Blameless'
  },
  tokens: []
}

export default newWarrior