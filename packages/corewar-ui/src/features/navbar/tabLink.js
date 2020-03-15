import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import styledProperty from 'styled-property'

import { colour, space } from '../common/theme'

const BaseLink = styled(NavLink)`
  color: ${colour.grey};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-right: 1px solid ${colour.defaultbg};
  &:hover {
    color: ${colour.white};
  }
`

const TabLink = styledProperty(BaseLink, 'activeClassName')`
  background-color: ${colour.defaultbg};
  color: ${colour.white};
  outline: none;
  border-top: 1px solid ${colour.blue};
  border-right: none;
`

TabLink.displayName = 'TabLink'

export default TabLink
