import styled from 'styled-components'

import { colour, space } from '../common/theme'

const WarriorPanel = styled.section`
  grid-row: 1 / 3;
  height: 100%;
  border-right: 1px solid ${colour.lightbg};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: ${space.m} 0;

  overflow-y: scroll;
`

export default WarriorPanel