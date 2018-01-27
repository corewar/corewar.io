import styled from 'styled-components'

import { space } from '../../../styles/theme'
import { media } from '../../../styles/mediaQuery'

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
`

Container.displayName = 'tabletContainer'

export default Container