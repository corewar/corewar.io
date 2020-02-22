import React from 'react'
import styled from 'styled-components'

import { colour } from '../common/theme'

const Container = styled.div.attrs({
  onClick: props => (props.enabled ? props.handleClick : null)
})`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => !props.visible && `display: none;`}
  ${props =>
    props.enabled ? `color: ${colour.lightgrey};` : `color: ${colour.grey};`}
  font-size: 20px;

  span {
    width: 2em;
    height: 2em;
    border-radius: 50%;
  }

  i {
    ${props => (props.enabled ? `color: ${colour.lightgrey};` : `color: ${colour.grey};`)}
    margin: 0.5em 0 0 0.5em;
  }

  .fa-play {
    padding-left: 0.15em;
  }

  .fa-pause {
    padding-left: 0.09em;
  }

  .fa-step-forward {
    padding-left: 0.2em;
  }

  .fa-undo {
    padding-left: 0.05em;
  }

  .fa-cog {
    padding-left: 0.05em;
  }

  &:hover {
    ${props =>
      props.enabled &&
      `
      cursor: pointer;
      span {
        background-color: ${colour.coral};
      }
      i {
        color: ${colour.white};
      }
    `}
  }
`

const FontAwesomeButton = ({ visible = true, enabled = true, handleClick, iconName }) => (
  <Container visible={visible} enabled={enabled} handleClick={handleClick}>
    <span>
      <i className={`fa fa-${iconName}`}></i>
    </span>
  </Container>
)

export default FontAwesomeButton
