import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../../styles/theme'

const StyledTextarea = styled.textarea`
  font-family: ${font.code};
  font-size: ${font.base};
  background-color: transparent;
  padding: ${space.m};
  width: calc(100% - ${space.m} - ${space.m});
  height: calc(100% - ${space.m} - ${space.m});
  border: none;
  caret-color: ${colour.white};
  color: ${colour.white};
  resize: none;

  &:focus {
    outline: none;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: ${space.xs};
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: ${space.xs};
    background-color: ${colour.blue};
  }

`

const ParserInput = ({ redcode, handleChange }) => (
  <StyledTextarea
    placeholder="enter your redcode"
    defaultValue={redcode}
    onChange={e => handleChange(e.target.value)}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false">
  </StyledTextarea>
)

export default ParserInput