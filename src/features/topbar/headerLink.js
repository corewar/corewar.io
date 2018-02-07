import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colour } from '../common/theme'

const HeaderLink = styled(Link)`
  color: ${colour.white};
  font-weight: 300;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default HeaderLink