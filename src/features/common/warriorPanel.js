import styled from 'styled-components'

import { colour, space } from '../common/theme'

const WarriorPanel = styled.section`
  height: calc(100vh - ${space.controls} - ${space.controls} - ${space.s} - ${space.controls});
  border-right: 1px solid ${colour.lightbg};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;

  .octicon {
    padding-left: 4px;
  }
`

export default WarriorPanel