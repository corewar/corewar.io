import styled from 'styled-components'

import { colour, space } from './theme'

const Controls = styled.div`
  border: none;
  background-color: ${colour.defaultbg};
  border-top: 1px solid ${colour.darkbg};

  grid-column: 1 / 3;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(${space.controls} - 1px);
  width: 100%;
`

export default Controls
