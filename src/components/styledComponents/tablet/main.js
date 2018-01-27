import styled from 'styled-components'

import { colour, space } from '../../../styles/theme'

const Main = styled.main`
  grid-row-start: 2;
  grid-row-end: 4;
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};
`

export default Main