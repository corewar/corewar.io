import styled from 'styled-components'

import { media } from  './../../../styles/mediaQuery'
import { colour } from '../../../styles/theme'

const Controls = styled.div`

  grid-row-start: 4;
  ${media.desktop`grid-row-start: 2`};
  ${media.tablet`grid-row-start: 2`};
  ${media.phone`grid-row-start: 4`};
  background-color: ${colour.lightbg};
  border-top: 1px solid ${colour.grey};

  display: flex;
  flex-direction: row;
`

export default Controls