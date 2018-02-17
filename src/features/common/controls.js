import styled from 'styled-components'

import { media } from  './mediaQuery'
import { colour, space } from './theme'

const Controls = styled.div`

  border: none;
  padding-left: 1em;
  padding-right: 1em;

  ${media.phone`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
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