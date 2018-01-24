import React from 'react'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import { colour, font } from '../../styles/theme'

const Container = styled.div.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`

  display: ${props => !props.visible && `none`};
  color: ${props => props.enabled && `${colour.white}`};
  font-size: ${font.small};

  &:hover {
    cursor: pointer;
    color: ${colour.blue}
  }
`

const FontAwesomeButton = ({ visible, enabled, handleClick, iconName }) => (
  <Container visible={visible} enabled={enabled} handleClick={handleClick}>
    <FontAwesome name={iconName} size="2x" />
  </Container>
)

export default FontAwesomeButton