import { getIdenticon } from '../features/common/identicon'

const blankSource = ''

const icon = getIdenticon(blankSource, 0)

const newWarrior = {
  active: true,
  source: blankSource,
  compiled: '',
  hasErrors: true,
  hash: '',
  icon: icon,
  metaData: {
    name: 'Nameless',
    author: 'Blameless'
  },
  tokens: []
}

export default newWarrior