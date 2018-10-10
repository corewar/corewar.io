import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import styledProperty from 'styled-property'

import { colour, space } from '../common/theme'

const BaseLink = styled(NavLink)`
  color: ${colour.grey};
  padding-top: ${space.m};
  height: calc(${space.header} - ${space.m});
  width: 100%;
  text-decoration: none;

  &:hover {
    color: ${colour.white};
  }
`

const TabLink = styledProperty(BaseLink, 'activeClassName')`
  background-color: ${colour.defaultbg};
  color: ${colour.white};
  outline: none;
  border-top: 1px solid ${colour.blue};
`

TabLink.displayName = 'TabLink'

export default TabLink