import styled from 'styled-components'

import { colour, space } from '../common/theme'
import { media } from '../common/mediaQuery'

const WarriorPanel = styled.section`



  ${media.desktop`
    height: calc(100vh - ${space.controls} - ${space.controls});
  `}
  ${media.phone`
     height: calc(100vh - ${space.controls} - ${space.controls} - ${space.s} - ${space.controls});
  `}

  border-right: 1px solid ${colour.lightbg};

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${media.desktop`
    flex-direction: column;
    align-items: flex-start;
  `}

  .octicon {
    padding-left: 4px;
  }
`

export default WarriorPanel