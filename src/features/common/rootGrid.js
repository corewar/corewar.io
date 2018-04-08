import styled from 'styled-components'

import { space } from  './theme'

const RootGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${space.header} 1fr;
`

export default RootGrid