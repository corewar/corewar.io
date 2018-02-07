import styled from 'styled-components'

import { sourceCode } from '../../styles/sourceCode'

import { colour, space } from '../common/theme'

const CompiledOutput = styled.pre`
  ${sourceCode};
  border-left: ${props => !props.mobile && `1px solid ${colour.grey}`};
  width: ${props => !props.mobile && `40%`};
  height: ${props => props.desktop && `calc(100vh - ${space.m} - ${space.m} - ${space.header} - ${space.header})`};
  color: ${colour.blue};
  padding-left: ${space.m};
`

export default CompiledOutput