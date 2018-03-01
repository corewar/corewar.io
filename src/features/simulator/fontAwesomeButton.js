import React from 'react'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

import { colour, font } from '../common/theme'

const Container = styled.div.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => !props.visible && `display: none;`}
  ${props => props.enabled ? `color: ${colour.lightgrey};` : `color: ${colour.grey};`}
  font-size: ${font.base};

  i.fa.fa-stack-1x {
    ${props => props.enabled ? `color: ${colour.lightgrey};` : `color: ${colour.grey};`}
  }

  i.fa.fa-stack-2x {
    color: transparent;
    box-shadow: 0 0 2px ${colour.lightgrey};
    border-radius: 50%;
  }

  &:hover {
    cursor: ${props => props.enabled && `pointer`};
    color: ${props => props.enabled && `${colour.blue}`};

    i.fa.fa-stack-1x {
      color: ${props => props.enabled && `${colour.defaultbg}`};
    }

    i.fa.fa-stack-2x {
      color: ${props => props.enabled && `${colour.white}`};
    }
  }

`

const FontAwesomeButton = ({ visible, enabled, handleClick, iconName }) => (
  <Container visible={visible} enabled={enabled} handleClick={handleClick}>
    <span class="fa-stack">
      <i class="fa fa-circle fa-stack-2x"></i>
      <i class={`fa fa-${iconName} fa-stack-1x fa-inverse`}></i>
    </span>
  </Container>
)

export default FontAwesomeButton