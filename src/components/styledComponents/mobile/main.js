import styled from 'styled-components'

import { colour, space } from '../../../styles/theme'

const Main = styled.main`
  grid-row-start: 3;
  height: calc(100vh - ${space.s} - ${space.header} - ${space.header} - ${space.controls});
  background-color: ${colour.defaultbg};
`

export default Main