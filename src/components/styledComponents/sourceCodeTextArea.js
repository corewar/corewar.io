import styled from 'styled-components'

import { sourceCode } from '../../styles/sourceCode'

const SourceCodeTextArea = styled.textarea.attrs({
  // we can define static props
  placeholder: 'enter your redcode',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: 'false',
  // or we can define dynamic ones
  onChange: props => props.handleChange
})`
  ${sourceCode}
`

export default SourceCodeTextArea