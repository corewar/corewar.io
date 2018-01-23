import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../../styles/theme'

import { sourceCode } from '../../styles/sourceCode'

const StyledTextarea = styled.textarea`
  ${sourceCode}
`

const ParserInput = ({ redcode, handleChange }) => (
  <StyledTextarea
    placeholder='enter your redcode'
    defaultValue={redcode}
    onChange={e => handleChange(e.target.value)}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false">
  </StyledTextarea>
)

export default ParserInput