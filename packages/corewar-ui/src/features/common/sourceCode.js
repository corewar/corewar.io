import { colour, space, font } from './theme'

export const sourceCode = props => `
  font-family: ${font.code};
  line-height: 1.2em;
  font-size: ${font.base};
  background-color: transparent;
  padding: ${space.m};
  width: calc(100% - ${space.m} - ${space.m});
  height: calc(100% - ${space.m} - ${space.m});
  border: none;
  caret-color: ${colour.white};
  color: ${colour.white};
  resize: none;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: keep-all;

  &:focus {
    outline: none;
  }
`
