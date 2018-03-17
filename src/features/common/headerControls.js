import styled from 'styled-components'

import { colour } from './theme'

const Controls = styled.div`
  grid-column: 1 / 5;
  height: 100%;
  background-color: ${colour.lightbg};
  text-align: center;

  display: grid;
  grid-template-columns: 100px 100px 100px 1fr 100px
`

export default Controls