import styled from 'styled-components'

import { sourceCode } from '../common/sourceCode'

import { space } from '../common/theme'

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
  ${sourceCode};
  height: ${props => props.desktop && `calc(100vh - ${space.m} - ${space.m} - ${space.header} - ${space.header})`};
`

export default SourceCodeTextArea