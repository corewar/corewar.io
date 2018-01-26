import styled from 'styled-components'

import { colour } from '../../../styles/theme'

const Controls = styled.div`
  grid-row-start: 2;
  background-color: ${colour.lightbg};
  border-top: 1px solid ${colour.grey};

  display: flex;
  flex-direction: row;
`

export default Controls