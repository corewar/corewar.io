
import { colour, space, font } from '../styles/theme'

export const sourceCode = props => `
  font-family: ${font.code};
  line-height: 1.2em;
  font-size: ${font.base};
  background-color: transparent;

  width: calc(100% - ${space.m} - ${space.m});
  height: 100%;
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