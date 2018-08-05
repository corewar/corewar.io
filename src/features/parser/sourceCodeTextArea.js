import styled from 'styled-components'
import PropTypes from 'prop-types'

import { sourceCode } from '../common/sourceCode'

import { space } from '../common/theme'

const SourceCodeTextArea = styled.textarea.attrs({
  // we can define static props
  placeholder: props => props.currentWarrior ? 'enter your redcode' : 'add a new file',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: 'false',
  value: props => props.currentWarrior ? props.currentWarrior.source : '',
  // or we can define dynamic ones
  onChange: props => props.currentWarrior ? props.handleChange : () => {}
})`
  ${sourceCode};
  ${props => props.desktop && `height: calc(100vh - ${space.m} - ${space.m} - ${space.header} - ${space.header})`};
`

SourceCodeTextArea.propTypes = {
  currentWarrior: PropTypes.shape({
    source: PropTypes.string
  }),
  handleChange: PropTypes.func
}

SourceCodeTextArea.defaultProps = {
  handleChange: () => {}
}

export default SourceCodeTextArea