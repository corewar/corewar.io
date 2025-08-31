import styled from 'styled-components'

import { colour, space } from './theme'

const MobilePage = styled.main`

  ${props => props.mobile && `grid-row-start: 3;`}
  ${props => props.tablet && `grid-row-start: 2;`}

  ${props =>
    props.mobile && `height: calc(100vh - ${space.s} - ${space.header} - ${space.header});`}
  ${props => props.tablet && `height: calc(100vh - ${space.header});`}

  background-color: ${colour.defaultbg};

  display: grid;
  grid-template-rows: 1fr ${space.controls};
  grid-template-columns: ${space.sidebar} 1fr;
`

export default MobilePage
