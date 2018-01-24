import styled from 'styled-components'

import { colour, space } from '../../../styles/theme'

const Main = styled.main`
  grid-row-start: 2;
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};

  display: grid;
  grid-template-columns: 1fr 48px;
  grid-template-rows: 1fr;
`

export default Main