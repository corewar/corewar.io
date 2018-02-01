import styled from 'styled-components'

import { space } from '../../../styles/theme'

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: ${space.s} ${space.header} 1fr ${space.controls};
  grid-template-columns: 1fr;
`

Container.displayName = 'mobileContainer'

export default Container