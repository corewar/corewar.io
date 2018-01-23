import styled from 'styled-components'

import { space } from '../../../styles/theme'
import { media } from '../../../styles/mediaQuery'

const Container = styled.div`
  display: none;
  grid-template-rows: ${space.s} 48px 1fr 48px;
  grid-template-columns: 1fr;

  ${media.phone`display: grid;`}
`

export default Container