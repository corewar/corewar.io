import React from 'react'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import { colour, font } from '../../styles/theme'

const Container = styled.div.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`

  display: ${props => !props.visible && `none`};
  color: ${props => props.enabled ? `${colour.white}` : `${colour.grey}`};
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