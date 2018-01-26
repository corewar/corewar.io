import styled from 'styled-components'

import { space } from '../../../styles/theme'

const MobileContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr ${space.controls}
`

export default MobileContent