import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../../styles/theme'

const StyledPre = styled.pre`
  font-family: ${font.code};
  font-size: ${font.base};
  line-height: 1.2em;
  background-color: transparent;
  padding: ${space.m};
  width: calc(100% - ${space.m} - ${space.m});
  height: calc(100% - ${space.m} - ${space.m});
  border: none;
  caret-color: ${colour.white};
  color: ${colour.white};
  resize: none;
  overflow-y: scroll;

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

const ParserOutput = ({ parseResult }) => (
  <StyledPre>
    {parseResult ? parseResult.warrior : 'awaiting redcode'}
  </StyledPre>
)

export default ParserOutput