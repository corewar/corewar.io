import styled from 'styled-components'

import { sourceCode } from '../../styles/sourceCode'

import { colour, space } from '../../styles/theme'
import { media } from '../../styles/mediaQuery'

const CompiledOutput = styled.pre`
  ${sourceCode};
  border-left: ${props => props.tablet && `1px solid ${colour.grey}`};
  color: ${colour.blue};
  padding-left: ${space.m};
`

export default CompiledOutput