import styled from 'styled-components'

import { colour, font, space } from '../common/theme'

const FeatureButton = styled.a`
  border: 2px solid ${colour.white};
  border-radius: 5px;
  margin: ${space.m};
  padding: ${space.m};
  background: none;
  display: inline-block;
  min-width: 200px;
  color: ${colour.white};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;

  :hover {
    color: ${colour.coral};
    background-color: ${colour.lightbg};
    cursor: pointer;
    transition: 0.2s;
  }
`

export default FeatureButton