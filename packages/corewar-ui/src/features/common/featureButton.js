import styled from 'styled-components'

import { colour, space } from '../common/theme'

const FeatureButton = styled.a`
  border: 2px solid ${colour.white};
  border-radius: 5px;
  margin: ${space.m};
  padding: ${space.m};
  background: none;
  display: inline-block;
  min-width: 200px;
  color: ${colour.lightgrey};
  font-weight: 300;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;

  :hover {
    background-color: ${colour.lightbg};
    color: ${colour.white};
    cursor: pointer;
    transition: 0.2s;
  }
`

export default FeatureButton
