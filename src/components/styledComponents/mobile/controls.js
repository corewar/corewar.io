import styled from 'styled-components'

import { media } from  './../../../styles/mediaQuery'
import { colour, space } from '../../../styles/theme'

const Controls = styled.div`

  grid-row-start: 4;

  ${media.designer`grid-row-start: 2;`}
  ${media.desktop`grid-row-start: 2;`}
  ${media.tablet`grid-row-start: 2;`}
  ${media.phone`grid-row-start: 4;`}

  border: none;

  ${media.phone`
    1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}
  ${media.tablet`
    1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}
  ${media.desktop`
    1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}

  display: flex;
  flex-direction: row;
  height: ${space.controls};
`

export default Controls