import OcticonButton from '../common/octiconButton'
import styled from 'styled-components'

import { colour } from '../common/theme'

const ConsoleButton = styled(OcticonButton)`
  ${props =>
    props.messages !== null &&
    `.octicon {
    color: ${getStatusColour(props.messages)};
  }`};
`

ConsoleButton.displayName = 'ConsoleButton'

const getStatusColour = messages => {
  const worst = getWorstMessage(messages)
  switch (worst) {
    case 'ERROR':
      return colour.error
    case 'WARNING':
      return colour.warning
    case 'INFO':
      return colour.info
    default:
      return colour.success
  }
}

const getWorstMessage = messages => {
  return messages && messages.length > 0
    ? messages.map(x => x.type).reduce((a, b) => Math.min(a, b))
    : null
}

export default ConsoleButton
