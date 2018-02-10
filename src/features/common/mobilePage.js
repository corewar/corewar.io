import styled from 'styled-components'

import { colour, space } from './theme'

const MobilePage = styled.main`
  grid-row-start: 3;
  height: calc(100vh - ${space.s} - ${space.header} - ${space.header});
  background-color: ${colour.defaultbg};

  display: grid;
  grid-template-rows: 1fr ${space.controls};
`

export default MobilePage