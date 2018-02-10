import styled from 'styled-components'

import { media } from  './mediaQuery'
import { colour, space } from './theme'

const Controls = styled.div`

  grid-row-start: 2;
  border: none;

  ${media.phone`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
    grid-row-start: 2;
  `}
  ${media.tablet`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}
  ${media.desktop`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}

  display: flex;
  flex-direction: row;
  height: calc(${space.controls} - 1px);
`

export default Controls