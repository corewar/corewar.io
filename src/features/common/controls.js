import styled from 'styled-components'

import { media } from  './mediaQuery'
import { colour, space } from './theme'

const Controls = styled.div`

  border: none;
  padding-left: 1em;
  padding-right: 1em;
  background-color: ${colour.defaultbg};
  // border-top: 1px solid ${colour.grey};
  // border-left: 1px solid ${colour.grey};
  // border-right: 1px solid ${colour.grey};

  ${media.phone`
    border-top: 1px solid ${colour.grey};

  `}
  ${media.tablet`
    border-top: 1px solid ${colour.grey};

  `}
  ${media.desktop`
    border-top: 1px solid ${colour.grey};
  `}

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(${space.controls} - 1px);
`

export default Controls