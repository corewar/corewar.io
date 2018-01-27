import styled from 'styled-components'

import { colour, space } from '../../../styles/theme'

const Core = styled.main`
  height: calc(100vh - ${space.header});
  background-color: ${colour.defaultbg};

  display: grid;
  grid-template-rows: 1fr ${space.controls};
`

Core.displayName = 'Core'

export default Core