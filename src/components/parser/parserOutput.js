import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../../styles/theme'
import { sourceCode } from '../../styles/sourceCode'

const StyledPre = styled.pre`
  ${sourceCode}
`

const ParserOutput = ({ parseResult }) => (
  <StyledPre>
    <code>
    {parseResult ? parseResult.warrior : 'awaiting redcode'}
    </code>
  </StyledPre>
)

export default ParserOutput