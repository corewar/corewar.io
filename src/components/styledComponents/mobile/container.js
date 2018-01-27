import styled from 'styled-components'

import { space } from '../../../styles/theme'
import { media } from '../../../styles/mediaQuery'

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: ${space.s} ${space.header} 1fr ${space.controls};
  grid-template-columns: 1fr;
`

export default Container