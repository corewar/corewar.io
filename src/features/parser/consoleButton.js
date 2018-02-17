import Button from '../common/button'

import { colour } from '../common/theme'

const ConsoleButton = Button.extend`
  ${props => props.messages !== null && `.octicon {
    color: ${getStatusColour(props.messages)};
  }`};
`

ConsoleButton.displayName = 'ConsoleButton'

const getStatusColour = (messages) => {
  const worst = getWorstMessage(messages)
  switch (worst) {
    case 0:
      return colour.error
    case 1:
      return colour.warning
    case 2:
      return colour.info
    default:
      return colour.success
  }
}

const getWorstMessage = (messages) => {
  return messages && messages.length > 0 ? messages.map(x => x.type).reduce((a, b) => Math.min(a, b)) : null
}

export default ConsoleButton