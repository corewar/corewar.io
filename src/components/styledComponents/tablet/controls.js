import styled from 'styled-components'

import { colour } from '../../../styles/theme'

const Controls = styled.div`
  grid-column-start: 2;
  height: 100%;
  background-color: ${colour.lightbg};
  border-left: 1px solid ${colour.grey};

  display: flex;
  flex-direction: column;
`

export default Controls