import styled from 'styled-components'

import { sourceCode } from '../../styles/sourceCode'

import { media } from '../../styles/mediaQuery'

const CompiledOutput = styled.pre`
  ${sourceCode}
`

export default CompiledOutput