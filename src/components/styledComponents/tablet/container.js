import styled from 'styled-components'

import { space } from '../../../styles/theme'

const Container = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 1fr ${space.controls};
  grid-template-columns: 1fr;
`

Container.displayName = 'tabletContainer'

export default Container