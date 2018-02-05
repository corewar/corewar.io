import styled from 'styled-components'

import { colour, space } from '../../../styles/theme'

const Main = styled.main`
  height: calc(100vh - ${space.controls} - ${space.header});
  background-color: ${colour.defaultbg};
`

Main.displayName = 'tabletMain'

export default Main