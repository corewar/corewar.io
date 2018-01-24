import styled from 'styled-components'

import { colour } from '../../../styles/theme'

const Controls = styled.div`
  grid-column: 1 / 4;
  height: 100%;
  background-color: ${colour.lightbg};
  border-bottom: 1px solid ${colour.grey};
  text-align: center;

  display: grid;
  grid-template-columns: repeat(10, 1fr)
`

export default Controls