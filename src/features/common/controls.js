import styled from 'styled-components'

import { media } from  './mediaQuery'
import { colour, space } from './theme'

const Controls = styled.div`

  border: none;
  background-color: ${colour.defaultbg};

  ${media.phone`
    border-top: 1px solid ${colour.lightbg};

  `}
  ${media.tablet`
    border-top: 1px solid ${colour.lightbg};

  `}
  ${media.desktop`
    border-top: 1px solid ${colour.lightbg};
  `}

  grid-column: 1 / 3;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(${space.controls} - 1px);
  width: 100%;
`

export default Controls