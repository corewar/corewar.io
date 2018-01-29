import styled from 'styled-components'

import { media } from  './../../../styles/mediaQuery'
import { colour, space } from '../../../styles/theme'

const Controls = styled.div`

  grid-row-start: 2;
  border: none;

  ${media.phone`
    border: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
    grid-row-start: 4;
  `}
  ${media.tablet`
    border: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}
  ${media.desktop`
    border: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}

  display: flex;
  flex-direction: row;
  height: ${space.controls};
`

export default Controls