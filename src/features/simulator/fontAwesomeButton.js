import React from 'react'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import { colour, font } from '../common/theme'

const Container = styled.div.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`
  ${props => !props.visible && `display: none;`}
  ${props => props.enabled ? `color: ${colour.white};` : `color: ${colour.grey};`}
  font-size: ${font.small};
  width: 100%;
  text-align: center;
  margin-top: ${font.small};

  &:hover {
    cursor: ${props => props.enabled && `pointer`};
    color: ${props => props.enabled && `${colour.blue}`};
  }
`

const FontAwesomeButton = ({ visible, enabled, handleClick, iconName }) => (
  <Container visible={visible} enabled={enabled} handleClick={handleClick}>
    <FontAwesome name={iconName} size="2x" />
  </Container>
)

export default FontAwesomeButton